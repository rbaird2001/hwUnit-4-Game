var objGame = {

    eleImgChar: $(".imgChar"),
    eleSelChar: $("#imgSelChar"),
    eleOppChar: $("#imgSelOpp"),
    arrDropChar: [], //To be populated by drop event
    arrOppChars: [], //To be populated by by setupChars function
    intSelCharPower: 0,
    intSelCharLife: 0,
    turtles: "i like turtles",
    selectImgChar: function () {
        this.setupCharDD(this.eleImgChar, this.eleSelChar);
    },
    selectOponnentChar: function () {
        this.setupCharDD(this.eleImgChar, this.eleOppChar);
    },
    setupChars: function (parDrag,parDrop) {
        // var dropChar = this.arrDropChar[0]
        if(parDrop === "imgSelChar"){
            this.setupOpps(parDrag);
        }
        //TODO: Ensure no other chars can be put into selected car by disabling #imgSelChar ability
        //TODO: randomize power of remaining chars.
        //TODO: add power from charPower.Char0 to selected char
        this.intSelCharPower = this.objCharPower.objChar0.power
        this.intSelCharLife = this.objCharPower.objChar0.life
        //TODO: Enable dropping to imgSelOpp
    },
    setupCharDD: function (eleDrag, eleDrop) {
        var self = this;
        $(eleDrag).draggable({
            revert: "invalid"
        });
        $(eleDrop).droppable({
            drop: function (event, ui) {
                let drag = $(ui.draggable).attr("id");
                let drop = $(event.target).attr("id");
                self.arrDropChar.push(drag);
                self.arrDropChar.push(drop);
                self.setupChars(drag,drop);
            }
        });
    },
    setupOpps: function (parDrag) {
        var imgChars = $(".imgChar").toArray();
        for (i = 0; i < imgChars.length; i++) {
            let imgCharID = $(imgChars[i]).attr("id");
            if (imgCharID != parDrag) {
                this.arrOppChars.push(imgCharID);            
            }
        }
        //Randomize arrOppChars array so opponents don't have same power/life each time
        this.randomizeArray(this.arrOppChars);
    },
    /**
     * Randomize array element order in-place.
     * Using Durstenfeld shuffle algorithm.
     * Which is a computer optimized variation
     *   of the Fisher-Yates algorithm.
     * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
     */
    randomizeArray : function (array) {
       for (var i = array.length - 1; i > 0; i--) {
           var j = Math.floor(Math.random() * (i + 1));
           var temp = array[i];
           array[i] = array[j];
           array[j] = temp;
       }
   },
    objCharPower: {
        objChar0: {
            power: 100,
            life: 200,
        },
        objChar1: {
            power: 150,
            life: 150
        },
        objChar2: {
            power: 200,
            life: 200
        },
        objChar3: {
            power: 250,
            life: 250
        },
    },
}
objGame.selectImgChar();
//objGame.selectOponnentChar();


// $( "#droppable" ).droppable({
//     drop: function( event, ui ) {
//       $( this )
//         .addClass( "ui-state-highlight" )
//         .find( "p" )
//           .html( "Dropped!" );

var simpleObj = {
    a: 'a',
    b: 'b',
    get ab() {
        return this.a + this.b;
    }
}

