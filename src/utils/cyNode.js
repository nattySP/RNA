export default function getCyNode({idx, residue, color, x, y}, fivePrime, threePrime){
    return {
        "group" : "nodes",
        "data" : {
            "id": `node_${residue}_${idx}`,
            "name": `${residue}${fivePrime ? " - 5'" : (threePrime ? " - 3'" : '')}`
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