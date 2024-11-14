const adjectives = [
    'pretty',
    'large',
    'big',
    'small',
    'tall',
    'short',
    'long',
    'handsome',
    'plain',
    'quaint',
    'clean',
    'elegant',
    'easy',
    'angry',
    'crazy',
    'helpful',
    'mushy',
    'odd',
    'unsightly',
    'adorable',
    'important',
    'inexpensive',
    'cheap',
    'expensive',
    'fancy',
];

const colours = [
    'red',
    'yellow',
    'blue',
    'green',
    'pink',
    'brown',
    'purple',
    'brown',
    'white',
    'black',
    'orange',
];

const nouns = [
    'table',
    'chair',
    'house',
    'bbq',
    'desk',
    'car',
    'pony',
    'cookie',
    'sandwich',
    'burger',
    'pizza',
    'mouse',
    'keyboard',
];

let id = 1;

const random = (max) => Math.round(Math.random() * 1000) % max;

export const buildData = (count) => {
    const data = [];

    for (let i = 0; i < count; i++) {
        const text = `${phrasings.adjectives[random(phrasings.adjectives.length)]} 
            ${phrasings.colours[random(phrasings.colours.length)]} 
            ${phrasings.nouns[random(phrasings.nouns.length)]}`
        data.push({
            id: id++, text
        })
    }

    return data;
};

export default { nouns, adjectives, colours }