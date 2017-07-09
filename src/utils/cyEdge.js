export default function getCyEdge(source, sequence, {target, type}){
    return {
        "group" : 'edges',
        "data" : {
            "id": `edge_${sequence[source].residue}_${source}_${sequence[target].residue}_${target}`,
            "source": `node_${sequence[source].residue}_${source}`,
            "target": `node_${sequence[target].residue}_${target}`,
            "type": type
        },
    }
}