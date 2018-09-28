class Functions{
    constructor(){}
    //Function which checks if an object is empty ( {} )
    isEmpty(object) {
        for (var i in object) {
            return true;
        }
        return false;
    }

}

var functions = new Functions();