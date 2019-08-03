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
    attackSet: false,
    selPlayLife: 0,
    selPlayPower: 0,
    oppPlayLife: 0,
    oppPlayPower: 0,
    playCount: 0,
    winCount: 0,
    gameIntro: "Use drag and drop to select  characters.",
    gameInstructions: "Drag your character in the designated box. Then drag the opponent to its designated spot. Use attack button to play.",
    beginPlayButtonText: "Got it. Ready to Play",
    turtles: "i like turtles",
    setupPlayChars: function () {
        self = (this);
        $("#rowChar").find(".imgChar").each(function () {
            self.arrPlayableChars.push(this.id);
        });
        this.prepCharsForReset(this.arrPlayableChars)
        this.setupCharDrag(this.eleImgChars);
        this.setupDrop(this.eleSelChar);
        //the called function is mainly used for battle outcomes but also works for intro detail.
        this.showBattleOutcome(this.gameIntro,this.gameInstructions,this.beginPlayButtonText);
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
    setupDrop: function (parDrop) {
        self = this
        $(parDrop).droppable({
            drop: function (event, ui) {
                var drag = $(ui.draggable).attr("id");
                var drop = $(event.target).attr("id");
                self.setupChars(drag, drop);
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
            $("#selPower").text(this.intSelCharPower);
            $("#selLife").text(this.intSelCharLife)
        }
        else {
            this.strSelOpp = parDrag;
            this.intOppCharPower = this.objOppPower[parDrag].power;
            this.intOppCharLife = this.objOppPower[parDrag].life;
            //this.setupBtnNewOpp();
            $("#oppPower").text(this.intOppCharPower);
            $("#oppLife").text(this.intOppCharLife);
            this.initPowerDisplay();
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
        this.objOppPower = {};
        for (i = 0; i < array.length; i++) {
            //Skip index 0 of arrCharsPower. It goes to the selected character
            //   The opponents get index 1 and above.
            let j = i + 1
            this.objOppPower[array[i]] = this.arrCharsPower[j];
        }
    },
    initPowerDisplay: function () {
        this.selPlayLife = this.intSelCharLife;
        this.selPlayPower = this.intSelCharPower;
        this.oppPlayLife = this.intOppCharLife;
        this.oppPlayPower = this.intOppCharPower;
    },
    setupAttack: function () {
        if (this.attackSet != true) {
            $("#btnAtt").click(this.attack.bind(this));
            this.attackSet = true;
        }
    },
    attack: function () {
        this.playCount++;
        this.oppPlayLife -= this.intSelCharPower;
        this.selPlayLife -= this.intOppCharPower;
        let battleOutcome = "";
        let battleOutcomeDetail = "";
        let closeButtonText = "";
        if (this.oppPlayLife <= 0) {
            this.winCount++
            battleOutcome = "VICTORY!"
            battleOutcomeDetail = "You have fought well and defeated your opponent."
            closeButtonText = "Continue playing"
            this.intSelCharLife += 35;
            this.intSelCharPower += 25;
            this.selPlayLife = this.intSelCharLife;
            this.selPlayPower = this.intSelCharPower
            removeOpp = "#" + this.strSelOpp;
            let remOppClass = $(removeOpp).attr("class") + " d-none";
            $(removeOpp).attr("class", remOppClass);
            $("#selPower").text(this.intSelCharPower);
            $("#selLife").text(this.intSelCharLife);
        }
        else if (this.selPlayLife <= 0) {
            battleOutcome = "Defeat."
            battleOutcomeDetail = "Your opponent was to strong for you at this time. Try another opponent first."
            closeButtonText = "Choose different opponent"
            this.newOpp();
            if (this.playCount > 0)
                this.selPlayLife = this.intSelCharLife;
                this.selPlayPower = this.intSelCharPower;
        }
        else {
            battleOutcome = "Excellent."
            battleOutcomeDetail = "You have weakened your opponent, but they are still able to fight. Try again."
            closeButtonText = "Resume battle"
        }
        this.showBattleOutcome(battleOutcome,battleOutcomeDetail,closeButtonText)
    },
    showBattleOutcome: function(Outcome,OutcomeDetail,buttonText){
        $("#battleOutcomeTitle").html(Outcome);
        $("#battleOutcomeDetail").html(OutcomeDetail);
        $("#closeButton").html(buttonText)
        $('#exampleModalCenter').modal();
        
    },

    /** Turns out drag/drop from JQueryUI doesn't have 
     *      a return to original position feature after 
     *      a successful drop. 
     * 
     * This resets position based
     *      on original position settings stored at initialize.
    * */
    newOpp: function () {
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
}

objGame.setupPlayChars();

