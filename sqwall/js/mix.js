// Define a function to rearrange the questions (and answers)
function shuffle(units, key) {
    for (var i = 0; i < units.length; i++) {
        var j = Math.floor(Math.random() * units.length);
        var tempUnit = units[i];
        var tmp = key[i];
        units[i] = units[j];
        key[i] = key[j];
        units[j] = tempUnit;
        key[j] = tmp;
    }
}