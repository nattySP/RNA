import React, { Component } from "react";
import { connect } from "react-redux";
import { hoverResidue, updateLayoutJson, newBond } from "../actions/index";
import { bindActionCreators } from "redux";
import cy from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';
edgehandles(cy);
import getCyNode from "../utils/cyNode"
import getCyEdge from "../utils/cyEdge"
import parseCSSforCy from "../utils/parseCSSforCy"

class SequenceLayout extends Component {
    componentDidMount(){
        parseCSSforCy(this.createCyInstance.bind(this));
    }

    componentDidUpdate(){
        if (this.props.isNewSequence) {
            this.cy.batch(()=>{
                this.cy.remove('node');
                this.cy.remove('edge');
                this.resetZoomPan();
            })
        }
        this.updateLayout();
        this.updateStyles();
        this.updateCyJson();
        this.applyHover();
    }

    componentWillReceiveProps(nextProps){
        this.updateColors(this.props.currentStyles.colors, nextProps.currentStyles.colors)
    }

    render() {
        return (
            <div>
                <div id="cy">
                </div>
                <button className="button is-pulled-right" onClick={()=>{this.resetZoomPan()}}>RESET ZOOM/PAN</button>
            </div>
        );
    }

    createCyInstance(baseStyle){
        let {residueSize, edgeWidth} = this.props.currentStyles.size;
        let font = this.props.currentStyles.font;
        let style = baseStyle.concat([
            {
                selector: 'node',
                style: {
                    'label': 'data(name)',
                    'font-size': `${ residueSize / 2 }`,
                    'font-weight': 'bold',
                    'text-halign' : 'center',
                    'text-valign' : 'center',
                    'text-outline-color': 'White',
                    'text-outline-width': 2,
                    'width': residueSize,
                    'height': residueSize,
                    'font-family': font
                }
            },
            {
                selector: 'edge',
                style: {
                    'width': edgeWidth,
                    'line-color': '#ccc'
                }
            },
            {
                selector: 'edge[type = "phosphodiester"]',
                style: {
                    'width': edgeWidth,
                    'line-color': 'Black'
                }
            }
        ]);

        this.cy = cy({
            container: document.getElementById('cy')
        });

        this.configureEdgeHandles();

        if (!_.isEmpty(this.props.currentLayout)) {
            this.cy.json(_.assign({}, JSON.parse(this.props.currentLayout), {style} ))
        }
        else {
            this.cy.json({
                zoom: 1,
                pan: { x: 200, y: 100 },
                minZoom: 1e-50,
                maxZoom: 1e50,
                zoomingEnabled: true,
                userZoomingEnabled: true,
                panningEnabled: true,
                userPanningEnabled: true,
                boxSelectionEnabled: false,
                selectionType: 'single',
                style
            })
        }

        this.registerHoverListeners();
    }

    registerHoverListeners(){
        this.cy.on('mouseover', 'node', (evt) => {
            let id = evt.target.id();
            id = id.split('_')[2];
            this.props.hoverResidue({idx: parseInt(id, 10), val: true})
        });
        this.cy.on('mouseout', 'node', (evt) => {
            let id = evt.target.id();
            id = id.split('_')[2];
            this.props.hoverResidue({idx: parseInt(id, 10), val: false})
        })
    }

    updateLayout(){
        let {nodes, links} = _.reduce(this.props.currentSequence, (mem, sequenceMember, idx)=>{
            let node = getCyNode(sequenceMember, idx === 0, idx === this.props.currentSequence.length - 1);
            mem.nodes.push(node);
            mem.links = mem.links.concat(_.map(sequenceMember.links, (link)=>{
                return getCyEdge(idx, this.props.currentSequence, link);
            }));
            return mem;
        }, {nodes: [], links: []});

        this.cy.add([...nodes, ...links]);
    }

    updateStyles() {
        let {residueSize, edgeWidth} = this.props.currentStyles.size;
        let font = this.props.currentStyles.font;

        this.cy.batch(()=>{
            this.cy.$('node')
                .css({
                    'font-family': font,
                    'font-size': `${residueSize / 2}`,
                    'width': `${residueSize}`,
                    'height': `${residueSize}`
                });

            this.cy.$('edge')
                .css({
                    'font-size': `${edgeWidth / 2}`,
                    'width': `${edgeWidth}`
                })
        })
    }

    updateColors(currentColors, nextColors) {
        if (!_.isEqual(currentColors, nextColors)) {
            this.cy.batch(()=>{
                this.cy.$('.A')
                    .removeClass(`background-${currentColors.aColor}`)
                    .addClass(`background-${nextColors.aColor}`);
                this.cy.$('.T')
                    .removeClass(`background-${currentColors.tColor}`)
                    .addClass(`background-${nextColors.tColor}`);
                this.cy.$('.C')
                    .removeClass(`background-${currentColors.cColor}`)
                    .addClass(`background-${nextColors.cColor}`);
                this.cy.$('.G')
                    .removeClass(`background-${currentColors.gColor}`)
                    .addClass(`background-${nextColors.gColor}`);
                this.cy.$('.N')
                    .removeClass(`background-${currentColors.nColor}`)
                    .addClass(`background-${nextColors.nColor}`);
            })
        }
    }

    applyHover() {
        let hovered = this.props.currentSequence[this.props.hover] || null;

        this.cy.batch(()=>{
            this.cy.$('.hover')
                .removeClass('hover');

            if (hovered) {
                let node = this.cy.$(`node[id = "node_${hovered.residue}_${hovered.idx}"]`);
                    node.addClass('hover')
            }
        })
    }

    updateCyJson() {
        let json = this.cy.json();
        this.props.updateLayoutJson(JSON.stringify(json || {}));
    }

    resetZoomPan(){
        this.cy.zoom(1);
        this.cy.pan({x:200, y:100});
    }

    createNewBondEdgeElement(sourceNode, targetNode){
        let sourceIdx = getIndexFromNodeElem(sourceNode[0]);
        let targetIdx = getIndexFromNodeElem(targetNode);
        return getCyEdge(sourceIdx, this.props.currentSequence, {target: targetIdx, type: 'hbond'});
    }

    createNewBond(sourceNode, targetNodes) {
        let sourceIdx = getIndexFromNodeElem(sourceNode[0]);
        let targetIdx = getIndexFromNodeElem(targetNodes[0]);
        this.props.newBond({source: Math.min(sourceIdx, targetIdx), target: Math.max(sourceIdx, targetIdx)});
    }

    checkNewBondValid(sourceNode, targetNode ) {
        let pairings = {
            'A': 'T',
            'T': 'A',
            'G': 'C',
            'C': 'G'
        };

        let sourceIdx = getIndexFromNodeElem(sourceNode[0]);
        let targetIdx = getIndexFromNodeElem(targetNode[0]);

        if (Math.abs(sourceIdx - targetIdx) <= 1) {
            return null;
        }

        let sourceResidue = getResidueFromNodeElem(sourceNode[0]);
        let targetResidue = getResidueFromNodeElem(targetNode[0]);

        if ((pairings.hasOwnProperty(sourceResidue) && pairings.hasOwnProperty(targetResidue)) && pairings[sourceResidue] !== targetResidue) {
            return null;
        }

        return 'flat';
    }

    configureEdgeHandles() {
        let edghandlesDefaults = {
            preview: true,
            stackOrder: 4,
            handleSize: 10,
            handleHitThreshold: 6,
            handleIcon: false,
            handleColor: '#ff3860',
            handleLineType: 'straight',
            handleLineWidth: 2,
            handleNodes: 'node',
            handlePosition: 'middle top',
            hoverDelay: 150,
            enabled: true,
            toggleOffOnLeave: true,
            edgeType: this.checkNewBondValid.bind(this),
            loopAllowed: function( node ) {
                return false;
            },
            edgeParams: this.createNewBondEdgeElement.bind(this),
            complete: this.createNewBond.bind(this)
        };

        this.cy.edgehandles(edghandlesDefaults);
    }
}

function getIndexFromNodeElem(node, id){
    id = id || node._private.data.id;
    return parseInt(id.split('_').pop(), 10);
}

function getResidueFromNodeElem(node, id){
    id = id || node._private.data.id;
    return id.split('_')[1];
}

function mapStateToProps(state) {
    return {
        currentSequence: state.sequence.currentSequence,
        currentStyles: state.sequence.currentStyles,
        currentLayout: state.layout,
        hover: state.hover,
        isNewSequence: state.isNewSequence
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ hoverResidue, updateLayoutJson, newBond }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SequenceLayout);