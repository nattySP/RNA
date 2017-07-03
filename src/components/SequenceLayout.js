import React, { Component } from "react";
import { connect } from "react-redux";
import { hoverResidue } from "../actions/index";
import { bindActionCreators } from "redux";
import * as d3 from 'd3';

class SequenceLayout extends Component {
    componentDidMount(){
        this.createLayout();
        this.updateLayout()
    }

    componentDidUpdate() {
        this.updateLayout()
    }

    render() {
        return (
            <svg width="500" height="500">
            </svg>
        );
    }

    createLayout() {
        const svg = d3.select("svg"),
            width = +svg.attr("width"),
            height = +svg.attr("height");
        let g = svg.append("g").attr('class', 'container').attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        g.append("g").attr('class', 'bases');
        g.append("g").attr('class', 'backbone');
        g.append("g").attr('class', 'basePair');
    }

    updateLayout() {
        let sequence = this.props.currentSequence;
        const baseG = d3.select("g.bases");
        const backboneG = d3.select("g.backbone");
        const basePairG = d3.select("g.basePair");

        const svg = d3.select("svg"),
            width = +svg.attr("width"),
            height = +svg.attr("height");

        let backBone = _.reduce(sequence, (mem, value, idx)=>{
            if (sequence[idx + 1]) {
                mem.push({source: idx, target: idx + 1})
            }
            return mem;
        },[]);

        let backBoneLinks = backboneG.selectAll("line")
            .data(backBone);

        backBoneLinks.enter().append("line")
            .attr("stroke", "#999")
            .attr("stroke-width", '1.5')
            .merge(backBoneLinks);


        let stack = [];
        let basePairings = _.reduce(sequence, (mem, value, idx)=>{
            if (value.dbn === '(') stack.push(idx);
            else if (value.dbn === ')') {
                let complementIdx = stack.pop();
                mem.push({source: complementIdx, target: idx})
            }
            return mem;
        }, []);

        let basePairingLinks = basePairG.selectAll("line")
            .data(basePairings);

        basePairingLinks.enter().append("line")
            .attr("stroke", "#999")
            .attr("stroke-width", '1.5')
            .merge(basePairingLinks);

        let bases = baseG.selectAll("circle")
            .data(sequence)
            .attr("class", function(d) { return d.hover ? 'hovered': 'not-hovered'});

        baseG.selectAll("circle.hovered")
            .attr("stroke-width", "3")
            .attr("stroke", "Black");

        baseG.selectAll("circle.not-hovered")
            .attr("stroke-width", '0');

        bases.enter().append("circle")
            .attr("r", 5)
            .attr("class", "not-hovered")
            .attr("fill", function(d) { return d.color; })
            .text(function(d){ return d.residue })
            .merge(bases);

        var simulation = d3.forceSimulation();

        simulation.nodes(sequence)
            .on("tick", ticked);

        simulation.force("charge", d3.forceManyBody().strength(-1000))
            .force("link", d3.forceLink(backBone).distance(20))
            .force("link", d3.forceLink(basePairings).distance(1))
            .force("x", d3.forceX())
            .force("y", d3.forceY());


        function ticked() {
            backBoneLinks
                .attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            basePairingLinks
                .attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            bases
                .attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });
        }
    }
}

function mapStateToProps(state) {
    return {
        currentSequence: state.sequence.currentSequence
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ hoverResidue }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SequenceLayout);