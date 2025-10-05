const { v4: uuidv4 } = require('uuid');

const users=[
    {
        id:uuidv4(),
        username: 'nayem',
        email : 'nayem@gmail.com'
    },
    {
        id:uuidv4(),
        username: 'shahriar',
        email : 'shahriar@gmail.com'
    },
    {
        id:uuidv4(),
        username: 'A. Alim',
        email : 'aalim@gmail.com'
    },
    {
        id:uuidv4(),
        username: 'A. halim',
        email : 'ahalim@gmail.com'
    },
]

module.exports= users;