import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
        id: 1,
        title: 'Harry Potter and the Sorcerer\'s Stone',
        description: 'An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world.',
        year: 2001,
        genre: {
            name: 'Fantasy',
            description: 'Fantasy films are films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds'
        },
        director: {
            name: 'Chris Columbus',
            bio: 'Chris Joseph Columbus is an American filmmaker. Born in Spangler, Pennsylvania, Columbus studied film at Tisch School of the Arts where he developed an interest in filmmaking.',
            birthdate: '1958-09-10'
        },
        imgURL: 'https://m.media-amazon.com/images/I/816vwyOsPiL._AC_UF1000,1000_QL80_.jpg',
        featured: true
    },
    {
        id: 2,
        title: 'The Dark Knight',
        description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
        year: 2008,
        genre: {
            name: 'Action',
            description: 'The action film is a film genre which predominantly features chase sequences, fights, shootouts, explosions, and stunt work.'
        },
        director: {
            name: 'Christopher Nolan',
            bio: 'Christopher Edward Nolan CBE is a British and American filmmaker. Known for his Hollywood blockbusters with complex storytelling, Nolan is considered a leading filmmaker of the 21st century. His films have grossed more than $6 billion worldwide, ranking him amongst the highest-grossing directors in history.',
            birthdate: '1970-07-30'
        },
        imgURL: 'https://m.media-amazon.com/images/I/81rGCm0PyHL.jpg',
        featured: false
    },
    {
        id: 3,
        title: 'The Hunger Games',
        description: 'Katniss Everdeen voluntarily takes her younger sister\'s place in the Hunger Games: a televised competition in which two teenagers from each of the twelve Districts of Panem are chosen at random to fight to the death.',
        year: 2012,
        genre: {
            name: 'Sci-Fi',
            description: 'Science fiction (or sci-fi or SF) is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, spacecraft, robots, cyborgs, mutants, interstellar travel, time travel, or other technologies.'
        },
        director: {
            name: 'Gary Ross',
            bio: 'Gary Ross is an American filmmaker. He is best known for writing and directing the fantasy comedy-drama film Pleasantville, the sports drama film Seabiscuit, the sci-fi action film The Hunger Games, and the heist comedy film Ocean\'s 8. Ross has been nominated for four Academy Awards.',
            birthdate: '1956-11-03'
        },
        imgURL: 'https://m.media-amazon.com/images/M/MV5BMjA4NDg3NzYxMF5BMl5BanBnXkFtZTcwNTgyNzkyNw@@._V1_.jpg',
        featured: true
    },
    {
        id: 4,
        title: 'Inception',
        description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
        year: 2010,
        genre: {
            name: 'Thriller',
            description: 'Thriller film, also known as suspense film or suspense thriller, is a broad film genre that evokes excitement and suspense in the audience.'
        },
        director: {
            name: 'Christopher Nolan',
            bio: 'Christopher Edward Nolan CBE is a British and American filmmaker. Known for his Hollywood blockbusters with complex storytelling, Nolan is considered a leading filmmaker of the 21st century. His films have grossed more than $6 billion worldwide, ranking him amongst the highest-grossing directors in history.',
            birthdate: '1970-07-30'
        },
        imgURL: 'https://m.media-amazon.com/images/I/71ZoAHU+byL._AC_UF894,1000_QL80_.jpg',
        featured: false
    },
    {
        id: 5,
        title: 'The Martian',
        description: 'An astronaut becomes stranded on Mars after his team assume him dead, and must rely on his ingenuity to find a way to signal to Earth that he is alive and can survive until a potential rescue.',
        year: 2015,
        genre: {
            name: 'Sci-Fi',
            description: 'Science fiction (or sci-fi or SF) is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, spacecraft, robots, cyborgs, mutants, interstellar travel, time travel, or other technologies.'
        },
        director: {
            name: 'Ridley Scott',
            bio: 'Sir Ridley Scott GBE is an English filmmaker. He is best known for directing films in the science fiction, crime and historical drama genres. His work is known for its atmospheric and highly concentrated visual style.',
            birthdate: '1937-11-30'
        },
        imgURL: 'https://m.media-amazon.com/images/M/MV5BMTc2MTQ3MDA1Nl5BMl5BanBnXkFtZTgwODA3OTI4NjE@._V1_.jpg',
        featured: true
    },
    {
        id: 6,
        title: 'My Cousin Vinny',
        description: 'Two New Yorkers accused of murder in rural Alabama while on their way back to college call in the help of one of their cousins, a loudmouth lawyer with no trial experience.',
        year: 1992,
        genre: {
            name: 'Comedy',
            description: 'A comedy film is a category of film that emphasizes humor. These films are designed to amuse audiences and make them laugh.'
        },
        director: {
            name: 'Jonathan Lynn',
            bio: 'Jonathan Adam Lynn is an English stage and film director, producer, writer, and actor. He directed the comedy films Clue, Nuns on the Run, My Cousin Vinny, and The Whole Nine Yards. He also co-created and co-wrote the television series Yes Minister.',
            birthdate: '1943-04-03'
        },
        imgURL: 'https://m.media-amazon.com/images/M/MV5BMTQxNDYzMTg1M15BMl5BanBnXkFtZTgwNzk4MDgxMTE@._V1_.jpg',
        featured: true
    },
    {
        id: 7,
        title: 'Finding Nemo',
        description: 'After his son is captured in the Great Barrier Reef and taken to Sydney, a timid clownfish sets out on a journey to bring him home.',
        year: 2003,
        genre: {
            name: 'Children',
            description: 'A children\'s film, or family film, is a film genre that generally relates to children in the context of home and family.'
        },
        director: {
            name: 'Andrew Stanton',
            bio: 'Andrew Ayers Stanton is an American filmmaker and voice actor based at Pixar, which he joined in 1990.',
            birthdate: '1965-12-03'
        },
        imgURL: 'https://m.media-amazon.com/images/I/71+H7cpoK9L.jpg',
        featured: false
    },
    {
        id: 8,
        title: 'Pirates of the Caribbean: The Curse of the Black Pearl',
        description: 'Blacksmith Will Turner teams up with eccentric pirate "Captain" Jack Sparrow to save his love, the governor\'s daughter, from Jack\'s former pirate allies, who are now undead.',
        year: 2003,
        genre: {
            name: 'Fantasy',
            description: 'Fantasy films are films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds.'
        },
        director: {
            name: 'Gore Verbinski',
            bio: 'Gregor Justin "Gore" Verbinski is an American film director. He is best known for directing Mouse Hunt, The Ring, the first three Pirates of the Caribbean films, and Rango. For his work on Rango, Verbinski won both the Academy Award and BAFTA Award for Best Animated Film.',
            birthdate: '1964-03-16'
        },
        imgURL: 'https://m.media-amazon.com/images/I/813Q1+EROpL.jpg',
        featured: false
    },
    {
        id: 9,
        title: 'National Treasure',
        description: 'A historian races to find the legendary Templar Treasure before a team of mercenaries.',
        year: 2004,
        genre: {
            name: 'Thriller',
            description: 'Thriller film, also known as suspense film or suspense thriller, is a broad film genre that evokes excitement and suspense in the audience.'
        },
        director: {
            name: 'Jon Turteltaub',
            bio: 'Jonathan Charles Turteltaub (born August 8, 1963) is an American film director and producer who directed successful mainstream films for Walt Disney Studios.',
            birthdate: '1963-08-08'
        },
        imgURL: 'https://m.media-amazon.com/images/M/MV5BMTY3NTc4OTYxMF5BMl5BanBnXkFtZTcwMjk5NzUyMw@@._V1_.jpg',
        featured: false
    },
    {
        id: 10,
        title: 'I am Legend',
        description: 'Years after a plague kills most of humanity and transforms the rest into monsters, the sole survivor in New York City struggles valiantly to find a cure.',
        year: 2007,
        genre: {
            name: 'Action',
            description: 'The action film is a film genre which predominantly features chase sequences, fights, shootouts, explosions, and stunt work.'
        },
        director: {
            name: 'Francis Lawrence',
            bio: 'Francis Lawrence is an American filmmaker and producer. After establishing himself as a director of music videos and commercials, Lawrence made his feature-length directorial debut with the superhero thriller Constantine and has since directed the post-apocalyptic horror film I Am Legend and the romantic drama Water for Elephants.',
            birthdate: '1971-03-26'
        },
        imgURL: 'https://m.media-amazon.com/images/M/MV5BYTE1ZTBlYzgtNmMyNS00ZTQ2LWE4NjEtZjUxNDJkNTg2MzlhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
        featured: false
    }
    
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);
  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }
  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
