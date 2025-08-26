function reverseVowels(s: string) : string {

    //using a set because lookups with has() = faster than includes
    const vowels = new Set(['a','e', 'i', 'o', 'u']);

    //converting the input array to string
    let arr = s.split('')
    
    //initialize the two pointer positions at array extremes
    let left = 0;
    let right = arr.length-1



    //running until they meet in the middle
    while (left < right) {
       //move left pointer forward if not a vowel
        while (left < right && !vowels.has(arr[left])){
            left++
        }
        //move right pointer backward if not a vowel
         while (left < right && !vowels.has(arr[right])){
             right--
         }
        if (left < right) {
            //swap vowels
            [arr[right], arr[left]] = [arr[left], arr[right]]
            //move pointers toward middle
            left++;
            right--;
        }
    }
    
    //return string from array
    return arr.join('')
}