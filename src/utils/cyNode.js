export default function getCyNode({idx, residue, color, x, y, hover}){
    return {
        "group" : "nodes",
        "data" : {
            "id": `node_${idx}`,
            "name": residue
        },
        "position" : {
            x,
            y
        },
        "selected" : false,
        "selectable" : true,
        "locked" : false,
        "grabbable" : true,
        "classes" : `${residue}  background-${color}`
    }
}