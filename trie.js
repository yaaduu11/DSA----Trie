

// Trie Node Class
class TrieNode {
    constructor() {
        this.children = {};  // To store children nodes
        this.isEndOfWord = false;  // To mark the end of a word
    }
}

// Trie Class
class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    // Insert a word into the Trie
    insert(word) {
        let currentNode = this.root;
        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            if (!currentNode.children[char]) {
                currentNode.children[char] = new TrieNode();
            }
            currentNode = currentNode.children[char];
        }
        currentNode.isEndOfWord = true;
    }

    // Search for a word in the Trie
    search(word) {
        let currentNode = this.root;
        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            if (!currentNode.children[char]) {
                return false;
            }
            currentNode = currentNode.children[char];
        }
        return currentNode.isEndOfWord;
    }

    // Check if there is any word in the Trie that starts with a given prefix
    startsWith(prefix) {
        let currentNode = this.root;
        for (let i = 0; i < prefix.length; i++) {
            const char = prefix[i];
            if (!currentNode.children[char]) {
                return false;
            }
            currentNode = currentNode.children[char];
        }
        return true;
    }

    // Delete a word from the Trie
    delete(word) {
        const deleteRecursively = (node, word, depth = 0) => {
            if (!node) {
                return false;
            }

            // If we've reached the end of the word
            if (depth === word.length) {
                // This word is no longer a valid word in the Trie
                if (!node.isEndOfWord) {
                    return false;
                }
                node.isEndOfWord = false;

                // If the node has no other children, delete it
                return Object.keys(node.children).length === 0;
            }

            const char = word[depth];
            const shouldDeleteChild = deleteRecursively(node.children[char], word, depth + 1);

            // If true, delete the child node
            if (shouldDeleteChild) {
                delete node.children[char];
                // Return true if no children left and not end of another word
                return Object.keys(node.children).length === 0 && !node.isEndOfWord;
            }

            return false;
        };

        deleteRecursively(this.root, word);
    }
}

// Example Usage
const trie = new Trie();
trie.insert("apple");
trie.insert("app");
console.log(trie.search("apple"));  // Output: true
console.log(trie.search("app"));    // Output: true
console.log(trie.search("appl"));   // Output: false
console.log(trie.startsWith("app"));// Output: true
trie.delete("app");
console.log(trie.search("app"));    // Output: false
console.log(trie.search("apple"));  // Output: true