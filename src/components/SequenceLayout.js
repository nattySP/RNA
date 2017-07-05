import React, { Component } from "react";
import { connect } from "react-redux";
import { hoverResidue, updateLayoutJson } from "../actions/index";
import { bindActionCreators } from "redux";
import cy from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';
edgehandles(cy);
import getCyNode from "../utils/cyNode"
import getCyEdge from "../utils/cyEdge"
import parseCSSforCy from "../utils/parseCSSforCy"

class SequenceLayout extends Component {
    componentDidMount(){
        parseCSSforCy(this.createLayout.bind(this));
    }

    componentDidUpdate(){
        this.updateLayout();
        this.updateCyJson();
    }

    componentWillReceiveProps(nextProps){
        this.updateColors(this.props.currentStyles.colors, nextProps.currentStyles.colors)
        this.applyHover();
    }

    render() {
        return (
            <div id="cy">
            </div>
        );
    }

    createLayout(style){
        style = style.concat([{
            selector: 'node',
            style: {
                    'content': 'data(name)'
                }
            },
            {
                selector: 'edge',
                style: {
                    'width': 3,
                    'line-color': '#ccc'
                }
            }
            ]);

        this.cy = cy({
            container: document.getElementById('cy'),
            style: style
        });

        if (!_.isEmpty(this.props.currentLayout)) {
            this.cy.json(JSON.parse(this.props.currentLayout))
        }
        else {
            this.cy.json({
                zoom: 1,
                pan: { x: 0, y: 0 },
                minZoom: 1e-50,
                maxZoom: 1e50,
                zoomingEnabled: true,
                userZoomingEnabled: true,
                panningEnabled: true,
                userPanningEnabled: true,
                boxSelectionEnabled: false,
                selectionType: 'single'
            })
        }

        this.registerHoverListeners();
    }

    registerHoverListeners(){
        this.cy.on('mouseover', 'node', (evt) => {
            let id = evt.target.id();
            id = id.split('_')[1];
            this.props.hoverResidue({idx: parseInt(id, 10), val: true})
        });
        this.cy.on('mouseout', 'node', (evt) => {
            let id = evt.target.id();
            id = id.split('_')[1];
            this.props.hoverResidue({idx: parseInt(id, 10), val: false})
        })
    }

    updateLayout(){
        let {nodes, links} = _.reduce(this.props.currentSequence, (mem, sequenceMember, idx)=>{
            mem.nodes.push(getCyNode(sequenceMember));
            mem.links = mem.links.concat(_.map(sequenceMember.links, (link)=>{
                return getCyEdge(idx, link);
            }));
            return mem;
        }, {nodes: [], links: []});

        this.cy.add([...nodes, ...links]);
    }

    updateColors(currentColors, nextColors) {
        //TODO: check if any colors have changed first
        this.cy.batch(()=>{
            this.cy.$('.A')
                .removeClass(`background-${currentColors.aColor}`)
                .addClass(`background-${nextColors.aColor}`)
            this.cy.$('.T')
                .removeClass(`background-${currentColors.tColor}`)
                .addClass(`background-${nextColors.tColor}`)
            this.cy.$('.C')
                .removeClass(`background-${currentColors.cColor}`)
                .addClass(`background-${nextColors.cColor}`)
            this.cy.$('.G')
                .removeClass(`background-${currentColors.gColor}`)
                .addClass(`background-${nextColors.gColor}`)
        })
    }

    applyHover() {
        let hovered = _.find(this.props.currentSequence, (residue)=>{
            return residue.hover;
        }, null);

        this.cy.$('.hover')
            .removeClass('hover');

        if (hovered) {
            let node = this.cy.$(`node[id = "node_${hovered.idx}"]`)
                node.addClass('hover')
        }
    }

    updateCyJson() {
        let json = this.cy.json();
        this.props.updateLayoutJson(JSON.stringify(json || {}));
    }
}

function mapStateToProps(state) {
    return {
        currentSequence: state.sequence.currentSequence,
        currentStyles: state.sequence.currentStyles,
        currentLayout: state.layout
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ hoverResidue, updateLayoutJson }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SequenceLayout);