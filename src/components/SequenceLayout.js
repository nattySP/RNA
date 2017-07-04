import React, { Component } from "react";
import { connect } from "react-redux";
import { hoverResidue } from "../actions/index";
import { bindActionCreators } from "redux";
import cy from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';
edgehandles(cy);
import getCyNode from "../utils/cyNode"
import getCyEdge from "../utils/cyEdge"

class SequenceLayout extends Component {
    componentDidMount(){
        this.createLayout();
    }

    componentDidUpdate(){
        this.updateLayout()
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

    createLayout(){
        this.cy = cy({
            container: document.getElementById('cy'),
            zoom: 1,
            pan: { x: 0, y: 0 },

            // interaction options:
            minZoom: 1e-50,
            maxZoom: 1e50,
            zoomingEnabled: true,
            userZoomingEnabled: true,
            panningEnabled: true,
            userPanningEnabled: true,
            boxSelectionEnabled: false,
            selectionType: 'single',

            style: [
                {
                    selector: 'node',
                    style: {
                        'content': 'data(name)'
                    }
                },
                {
                    selector: '.background-Red',
                    style: {
                        'background-color': 'Red'
                    }
                },
                {
                    selector: '.background-Orange',
                    style: {
                        'background-color': 'Orange'
                    }
                },
                {
                    selector: '.background-Yellow',
                    style: {
                        'background-color': 'Yellow'
                    }
                },
                {
                    selector: '.background-Green',
                    style: {
                        'background-color': 'Green'
                    }
                },
                {
                    selector: '.background-Blue',
                    style: {
                        'background-color': 'Blue'
                    }
                },
                {
                    selector: '.background-Indigo',
                    style: {
                        'background-color': 'Indigo'
                    }
                },
                {
                    selector: '.background-Violet',
                    style: {
                        'background-color': 'Violet'
                    }
                },
                {
                    selector: '.bg-primary',
                    style: {
                        'background-color': 'Aqua'
                    }
                },
                //{
                //    selector: '.edgehandles-hover',
                //    style: {
                //        'background-color': 'Aqua'
                //    }
                //},
                {
                    selector: 'edge',
                    style: {
                        'width': 3,
                        'line-color': '#ccc'
                    }
                }
            ]
        })

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

        this.cy.$('.bg-primary')
            .removeClass('bg-primary');

        if (hovered) {
            let node = this.cy.$(`node[id = "node_${hovered.idx}"]`)
                node.addClass('bg-primary')
        }
    }
}

function mapStateToProps(state) {
    return {
        currentSequence: state.sequence.currentSequence,
        currentStyles: state.sequence.currentStyles
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ hoverResidue }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SequenceLayout);