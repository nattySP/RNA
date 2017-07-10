# RNA

Interactive RNA secondary structure display

This is a React/Redux app -- I used this project as a starter https://github.com/StephenGrider/ReduxSimpleStarter

The project is deployed on Heroku at https://explorna.herokuapp.com/

**Some Key Libraries Used:**
* Cytoscapejs for graph layout
* I used the NAView javascript port created for https://github.com/bene200/drawrnajs to
   calculate coordinates for layout
* Clipboardjs for copying link to clipboard, and Pako to compress JSON for URL
* redux-form for form components
* Bulma CSS framework

**The app is composed of several React components:**

_**Form components:**_
* SequenceInput (input the sequence and the dot bracket notation)
* ColorSelector (change the color of the residues)
* FontSelector (change the font of the residues)
* SizeChanger (change the size of the residues and the width of the bonds)

_**Sequence display components:**_
* SequenceDisplay (the sequence and dot bracket representation of the RNA)
* SequenceLayout (the interactive graph layout of the RNA)

_**To share the view:**_
* GetShareable (compresses JSON of state and appends to URL that can be navigated to or can be copied to clipboard)

**Description of state:**
```
{
    form: contains the state of all the forms
    hover: index in sequence of currently hovered residue
    sequence: array of objects describing each residue {idx, residue (A, T, G, C, N), dbn ('(', ')', '.'), color, font}
    layout: stringified JSON of the current state of the graph layout (used to share view)
    isNewSequence: notifies if current sequence update is result of a new sequence submission
}
```
