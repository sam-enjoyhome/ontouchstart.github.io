window.onload = function () {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var size = width > height ? height : width;
    var s = size / 5;
    var margin = s / 10;
    var innerSize = s - margin * 2;

    var body = d3.select("body").html("").style({"padding-top": 25});

    var levelSelect = body.append("select")
        .style({"margin-left": 20})
        .on("change", function () {
                console.log(this.selectedIndex);
                game(this.selectedIndex, 5);
                });

    var problem = body.append("div")
        .style({
                "margin": 0,
                "padding": 0,
                "width": "100%",
                "height": "100%"
                });

    for(var i = 1; i < 33; i++) {
        levelSelect.append("option")
            .html("Level " + i)
    }

    var overlay = body.append("div")
        .style({
                "position": "absolute",
                "width": "100%",
                "height": "100%",
                "top": 0,
                "left": 0,
                "text-align": "center",
                "padding-top": height/5,
                "color": "ivory",
                "font-family": 'Chalkduster',
                "background": "rgba(30, 55, 2, 0.9)",
                "display": "none"
                })

    function game(level, n) {
        overlay.style({"display": "none"});
        d3.selectAll("option")[0][level].selected = true;
        var mistakes = 0;
        problem.html("");
        var h1 = problem.append("h1")
            .style({
                    "text-align": "right",
                    "color": "navy",
                    "margin-right": 20,
                    "margin-top": -20
                    });

        var table = problem.append("table")
            .style({
                    "position": "relative",
                    "margin": "auto"
                    })

        var problemSet = [];
        var currentQuestion;

        function init() {
            problemSet = [];
            for(var i = 1; i < n; i++) {
                for (var j = 1; j < n; j++) {
                    var x = i + level;
                    var y = j + level;
                    problemSet.push([x, y, x * y])
                }
            }
        }

        function newQuestion() {
            var tmp = d3.shuffle(problemSet);
            problemSet = tmp;
            return problemSet.pop();
        }

        function reset () {
            if ( currentQuestion = newQuestion()) {
                var x = currentQuestion[0];
                var y = currentQuestion[1];
                h1.html(x + " × " + y + " = ?");
            }
            else {
                if( mistakes > 0 ) {
                    if( mistakes > 1) {
                        overlay.html("<img src=\"sad.png\" width=\"150\"/><p>Oops, you made " + mistakes + " mistakes. Please try again. <p>");
                    }
                    else {
                        overlay.html("<img src=\"sad.png\" width=\"150\"/><p>Oops, you made one mistake. Please try again.<p>");
                    }
                    overlay.style({"display": "block", "color": "red"})
                        .on("touchstart", function () {game(level, 5);});
                }
                else {
                    if(level < 19) {
                        overlay.html("<img src=\"cool.png\" width=\"150\"/><p>Great job! Move up to the next level.");
                        overlay.style({"display": "block", "color": "yellow"})
                            .on("touchstart", function () {game(level + 1, 5);});

                    }
                    else {
                        overlay.html("<img src=\"cool.png\" width=\"150\"/><p>Great job! You finished the highest level of " + (level + 1));
                        overlay.style({"display": "block", "color": "yellow"})
                            .on("touchstart", function () {game(0, 5);});
                    }
                }
            }
        }

        init();
        reset();

        for(var i = 1; i < n; i++) {
            var row = table.append("tr");
            for( j = 1; j < n; j++) {
                var x = i + level;
                var y = j + level;
                var value = x * y;

                var cell = row.append("td")
                    .style({
                            "position": "relative",
                            "width": s,
                            "height": s,
                            "padding": 0,
                            "margin": 0
                            });

                var label = cell.append("button")
                    .html("<img src=\"up.png\" width=\"50\"/>")
                    .style({
                            "position": "absolute",
                            "top": margin,
                            "left": margin,
                            "width": innerSize,
                            "height": innerSize,
                            "border-radius": innerSize,
                            "text-align": "center",
                            "border-width": 0,
                            "color": "#FFFFFF",
                            "background": "#68D321"
                            });

                var button = cell.append("button")
                    .html(value)
                    .style({
                            "position": "absolute",
                            "top": margin,
                            "left": margin,
                            "width": innerSize,
                            "height": innerSize,
                            "border-radius": innerSize,
                            "text-align": "center",
                            "border-width": 0,
                            "color": "#4A4A4A",
                            "background": "#CCCCCC",
                            "box-shadow": "2px 2px 2px #888888"
                            });
                function check() {
                        var _this = this;
                        if(currentQuestion) {
                            if(_this.innerHTML == currentQuestion[2]) {
                                _this.style.display = "none";
                                reset();
                            }
                            else {
                                this.style.color = "#FFFFFF";
                                this.style.background = "#D02D02";
                                mistakes++;
                            }
                        }
                        else {
                            game(level, 5);
                        }
                }
		button.on("touchstart", check);
            }
        }
    }
    game(0, 5);
}
