function isSubsequence(s: string, t: string): boolean {
    const bigger = t.split('')

//creating and populating a hash map of larger string, characters as keys, arrays of indices as values
    const tHash: Record<string, number[]> = {}

    for(let i = 0; i < bigger.length; i++){
        let char = bigger[i]

        //if the character doesn't exist in the hash, initialize it as an array
        if(!tHash[char]){
            tHash[char] = []
        }
        
        tHash[char].push(i)
    }

 

    return true
};






//did you know??
// Record<K, V> is a TypeScript utility type that explicitly defines an object where:
// K (key type) is always a string (or another key-like type).
// V (value type) is the type we assign to each key.
