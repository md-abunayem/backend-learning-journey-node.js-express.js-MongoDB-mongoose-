# Random-Movies

- Use movie titles as project names
- Use movie descriptions as paragraph placeholders

## Installation

```bash
npm install random-movies
```

## API

```javascript
const { randomTitle, randomDesc, randomMovie } = require('random-movies');

randomTitle();
// The Dark Knight

randomTitle(3);
/*
 [
      'Casablanca',
      'Veinteañera, Divorciada y Fantástica',
      'A Man Escaped',
      'The Great Dictator',
      'The Treasure of the Sierra Madre',
      'Inner Workings'
    ]
*/

randomDesc();
// Johan and Marianne are married and seem to have it all. Their happiness, however, is a façade for a troubled relationship, which becomes even rockier when Johan admits that he's having an affair. Before long, the spouses separate and move towards finalizing their divorce, but they make attempts at reconciling. Even as they pursue other relationships, Johan and Marianne realize that they have a significant bond, but also many issues that hinder that connection.

randomDesc(2);
/*
[
      "A working man's livelihood is threatened when someone steals his bicycle.",
      'The Grand Budapest Hotel tells of a legendary concierge at a famous European hotel between the wars and his friendship with a young employee who becomes his trusted protégé. The story involves the theft and recovery of a priceless Renaissance painting, the battle for an enormous family fortune and the slow and then sudden upheavals that transformed Europe during the first half of the 20th century.',
    ]
*/

randomMovie();
/*
{
        title: 'A Trip to the Moon',
        description: 'Professor Barbenfouillis and five of his colleagues from the Academy of Astronomy travel to the Moon aboard a rocket propelled by a giant cannon. Once on the lunar surface, the bold explorers face the many perils hidden in the caves of the mysterious planet.'
      },
*/
```

## Credits

- Data from [https://www.themoviedb.org/](https://www.themoviedb.org/)
