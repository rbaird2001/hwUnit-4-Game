var objGame = {

    eleImgChar : $(".imgChar"),
    eleSelChar : $("#imgSelChar"),
    eleOppChar : $("#imgSelOpp"),
    arrDropChar : [], //To be populated by drop event
    arrOppChars : [] //To be populated by by setupChars function
    intSelCharPower : 0,
    intSelCharLife : 0,
    setupChars : function(){
        if(this.arrDropSelChar[1]="imgSelChar"){
            //TODO: Ensure no other chars can be put into selected car by disabling #imgSelChar ability
            //TODO: randomize power of remaining chars.
            
            //TODO: add power from charPower.Char0 to selected char
            this.intSelCharPower = this.objCharPower.objChar0.power
            this.intSelCharLife = this.objCharPower.objChar0.life
            //TODO: Enable dropping to imgSelOpp
        }
        else{
            //TODO: Ensure no others chars can be added till next match
            //TODO: add opp's assigned power
            //TODO: Enable attack button            
        }
        return true;
    },
    setupCharDD : function (eleDrag,eleDrop) {
        var self = this;
        $( eleDrag ).draggable({
            revert: "invalid"
          });
        
          $( eleDrop ).droppable({
                drop: function(event,ui){
                    let drag = $(ui.draggable).attr("id");
                    let drop = $(event.target).attr("id");
                    self.arrDropChar.push = drag;
                    self.arrDropChar.push = drop;
                }
                
            });
    },
    selectImgChar : function() {
        this.setupCharDD(this.eleImgChar,this.eleSelChar);
    },
    selectOponnentChar : function(){
        this.setupCharDD(this.eleImgChar,this.eleOppChar);
    },

    addCharPower : function(char){
    },
    objCharPower : {
        objChar0 : {
            power : 100,
            life: 200,
        },
        objChar1 : {
            power : 150,
            life : 150
        },
        objChar2 : {
            power : 200,
            life : 200
        },
        objChar3 : {
            power : 250,
            life : 250
        },
    },
}
objGame.selectImgChar();
objGame.selectOponnentChar();


// $( "#droppable" ).droppable({
//     drop: function( event, ui ) {
//       $( this )
//         .addClass( "ui-state-highlight" )
//         .find( "p" )
//           .html( "Dropped!" );

var simpleObj = {
    a: 'a',
    b: 'b',
    get ab () {
        return this.a + this.b;
    }
}

