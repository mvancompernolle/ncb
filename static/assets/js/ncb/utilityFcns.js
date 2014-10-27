function getIndex(source, attr, value) {
	// return index if found
    for(var i=0; i<source.length; i++) {
        if(source[i][attr] === value) {
            return i;
        }
    }
    // return -1 if not found
    return -1;
};
