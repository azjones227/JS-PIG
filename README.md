# JS-PIG by Amos Jones

JavaScript version of dice game, PIG

PIG is an old timey dice game that's alot of fun. So we're going to code it.

The Rules

A player rolls two dice. The sum gives them a score for that turn. They can bank the turn score into their total score and end their turn, or they can roll again to try to add to their turn score.

If either of the two dice is a 1, they are a Pig. Their score for that turn is reset to 0 their turn ends.

If both dice are a 1, aka Snake-eyes, aka DOUBLE PIG, their TOTAL score is reset to 0 and their turn ends.

If they roll doubles of any other kind, they are compelled to roll again and cannot bank.

Pseudocode First

Talk about this in your pair and share ideas before you write any code. Write down what classes you will need, and what methods and properties they will need to have.

Keep it object oriented. Otherwise you will end up with a Big Ball of Mud

Use Python's random library for the dice.

First Iteration

Two players should be able to play up to a score of their choice. It would be nice if they could choose their winning score setting using command line arguments / ARGV.

Second Iteration

Program an AI to play PIG against. You decide how its play style. Using command line arguments, players should be able to decide if they want to play 2 player or solo. Maybe players can also choose a difficulty setting that determines how tight it's play style is.

Acknowledgements:
Rosina Jones for her unwavering support and belief in me and my potential.  Omar A.H. Jones and Amos Z. Jones Jr. for being the motivations behind everything I do.  Byte Academy for their tutelage and support.  William Mantly for tireless mentoring, consulting, during immersion hours and during his personal time.  Thomas Harvey for advice on different techniques related to game state tracking. Kai Chuang for introducing me to the liquid fuel that keeps me going in all projects.