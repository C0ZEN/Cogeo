# Cogeo

A very simple but complete chat app like Slack and Discord.  
You can manage groups, channels and users.  

The design is 100% homemade.  
Most of the components are custom (input, textarea, dropdown...).  
We have a full control of the behavior and the design, via the [cozen](https://bitbucket.org/C0ZEN/cozen) library.

## About Cogeo

Do you want to know more about the Cogeo app ?  
Then this section if for you.

We created the [cozen](https://bitbucket.org/C0ZEN/cozen) library at first to (re)create a lot of web components.  
This library handle translations, themes and give us a lot of generic services, filters and methods to increase the modularity for our apps.  

**Available translations :**

- English [en]
- Français [fr]

**Available themes :**

- Atom

We almost achieve the first release version.  
We have a complete Back-Office for the user, the groups and the channels.  
We are working on the chat last features (async messages and video chat still missing).  
We started the creation of Robots (IA).

## Getting Started

Before anything below, run `npm install` to install the **node_modules** and **bower_components**.

Use `grunt serve` to start the app.

Use `grunt release` to create the minified version of the app.

Use `npm start` when the release is ready to start a live preview with **electron**.

Use `npm package-*` to create the electron packaged version of the app.  
This is the complete list of `package-*` commands :

- `package-all` to create all the avaialble packages
- `package-win` to create the windows package
- `package-lin` to create the linux package

## Running the tests

There is no test for now.  
We don't have the time for that, sorry.

## Built With

* [Yeoman](http://yeoman.io/) - The Web's scaffolding tool for modern webapps
* [Angular](https://angular.io/) - Superheroic JavaScript MVW Framework
* [cozen](https://bitbucket.org/C0ZEN/cozen) - External custom library
* [Trello](https://trello.com/) - Todo list management

## Contributing

Too early to add constraints over the way we want the app.

## Versioning

The versioning is managed by our own.  
You can checkout the [tags for this repository](https://github.com/C0ZEN/Cogeo/tags).

## Authors

* **Geoffrey Testelin** - Front-End Developer - [C0ZEN](https://github.com/C0ZEN)
* **Benoit Compere** - Back-End Developer - [BenoitCompere](https://github.com/BenoitCompere)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

* [AdRoll UI Framework](https://dribbble.com/shots/2833155-AdRoll-UI-Framework) inspired theme by [Mason Lee](https://dribbble.com/masonlee) 
