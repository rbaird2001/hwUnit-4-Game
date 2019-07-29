var objGame = {

    eleImgChars: $(".imgChar"),
    eleSelChar: $("#imgSelChar"),
    eleOppChar: $("#imgSelOpp"),
    arrPlayableChars: [],
    arrDropChar: [], //To be populated by drop event
    arrOppChars: [], //To be populated by by setupChars function
    strSelChar: "",
    intSelCharPower: 0,
    intSelCharLife: 0,
    strSelOpp: "",
    intOppCharPower: 0,
    intOppCharLife: 0,
    attackSet : false,
    selPlayLife : 0,
    selPlayPower : 0,
    oppPlayLife : 0,
    oppPlayPower :0,
    playCount : 0,
    turtles: "i like turtles",
    setupPlayChars: function () {
        self = (this);
        $("#rowChar").find(".imgChar").each(function () { 
           self.arrPlayableChars.push(this.id); 
        });
        this.prepCharsForReset(this.arrPlayableChars)
        this.setupCharDrag(this.eleImgChars);
        this.setupDrop(this.eleSelChar);
    },
    prepCharsForReset: function (parArray) {
        for (i = 0; i < parArray.length; i++) {
            let jqImgChar = "#" + parArray[i];
            $(jqImgChar).data({
                'originalLeft': $(jqImgChar).css('left'),
                'origionalTop': $(jqImgChar).css('top')
            });

        }

    },
    setupCharDrag: function (parDrag) {
        $(parDrag).draggable({
            revert: "invalid"
        });
    },
    setupDrop: function(parDrop){
        self = this
        $(parDrop).droppable({
            drop: function (event, ui) {
                var drag = $(ui.draggable).attr("id");
                var drop = $(event.target).attr("id");
                self.setupChars(drag,drop);
            }
        });
    },
    setupChars: function (parDrag, parDrop) {
        if (parDrop === "imgSelChar") {
            this.setupOpps(parDrag);
            this.strSelChar = parDrag;
            this.intSelCharPower = this.arrCharsPower[0].power
            this.intSelCharLife = this.arrCharsPower[0].life
            this.setupDrop(this.eleOppChar);
        }
        else {
            this.strSelOpp = parDrag;
            this.intOppCharPower = this.objOppPower[parDrag].power;
            this.intOppCharLife = this.objOppPower[parDrag].life;
            //this.setupBtnNewOpp();
            this.initPowerDisplay;
            this.setupAttack();
        }
        //TODO: Ensure no other chars can be put into selected car by disabling #imgSelChar ability
    },
    setupOpps: function (parDrag) {
        var idxChar = this.arrPlayableChars.indexOf(parDrag);
        if (idxChar != -1) {
            this.arrPlayableChars.splice(idxChar, 1);
            //Randomize arrOppChars array so opponents don't have same 
            //   power/life each time
            this.randomizeArray(this.arrPlayableChars);
            //assign opponents their power
            this.powerOpps(this.arrPlayableChars);
        }
    },
    randomizeArray: function (array) {
        /**
         * Randomize array order in-place.
         * Use Fisher-Yates Algorithm
         * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
         */
        for (i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    },
    powerOpps: function (array) {
        /**
         * Take randomized opponent array and combine
         *    with character powers array and create new
         *    object assigning each character to its power
         */
        this.objOppPower = {};
        for (i = 0; i < array.length; i++) {
            //Skip index 0 of arrCharsPower. It goes to the selected character
            //   The opponents get index 1 and above.
            let j = i + 1
            this.objOppPower[array[i]] = this.arrCharsPower[j];
        }
    },
    initPowerDisplay: function(){
        this.selPlayLife = this.intSelCharLife;
        this.selPlayPower = this.intSelCharPower;
        this.oppPlayLife = this.intOppCharLife;
        this.oppPlayPower = this.intOppCharPower;
    },
    setupAttack: function () {
        if (this.attackSet != true){
            $("#btnAtt").click(this.attack.bind(this));
            this.attackSet = true;
        }
    },
    attack: function () {
            this.playCount++;
            this.oppPlayLife -= this.intSelCharPower;
            this.selPlayLife -= this.intOppCharPower;
        if (this.oppPlayLife <= 0) {
            alert("victorious");
        }
        else if (this.selPlayLife <= 0) {
            alert("defeat");
            this.newOpp();
            this.selPlayLife = this.intSelCharLife;
            this.selPlayPower = this.intSelCharPower;
        }
    },

    // setupBtnNewOpp: function(){
    //     $("#btnNewOpp").click(this.newOpp.bind(this));
    // },

    /** Turns out drag/drop from JQueryUI doesn't have 
     *      a return to original position feature after 
     *      a successful drop. This resets position based
     *      on original position settings stored at initialize.
    * */

    newOpp: function (){
        jqSelOpp = "#" + this.strSelOpp
        $(jqSelOpp).css({
            'left': $(jqSelOpp).data('originalLeft'),
            'top': $(jqSelOpp).data('origionalTop')
        });
    },
    objOppPower: {},
    arrCharsPower: [{ power: 100, life: 200, },
        { power: 150, life: 150 },
        { power: 200, life: 200 },
        { power: 250, life: 250 }
    ],
    // selectImgChar: function () {
    //     this.selectOpponentChar();
    // },
    // selectOpponentChar: function () {
    //     this.setupCharDrag(this.eleImgChars, this.eleOppChar);
    // },  
}

objGame.setupPlayChars();
//objGame.selectImgChar();
// objGame.selectOpponentChar();
// objGame.setupResetButton();


// $( "#droppable" ).droppable({
//     drop: function( event, ui ) {
//       $( this )
//         .addClass( "ui-state-highlight" )
//         .find( "p" )
//           .html( "Dropped!" );

// var simpleObj = {
//     a: 'a',
//     b: 'b',
//     get ab() {
//         return this.a + this.b;
//     }
// }

