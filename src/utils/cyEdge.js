export default function getCyEdge(source, {target, type}){
    return {
        "group" : 'edges',
        "data" : {
            "id": `edge_${source}_${target}`,
            "source": `node_${source}`,
            "target": `node_${target}`
        },
        "scratch" : {
            type
        }
    }
}