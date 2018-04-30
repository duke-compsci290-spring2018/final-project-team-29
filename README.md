# kvite

A web application designed to expediate and simplify the tenting process at Duke<br>
Check it out at https://duke-compsci290-spring2018.github.io/final-project-team-29/ !!<br>

Names: Christine Hwang (jmh146) & Matthew O'Boyle (mo121)<br>
Time Spent: 3/29-4/30 (about a month & 70-80 hours total)<br>
Collaborators: Heck to the no! 😤😤😤 this is our masterpiece<br>
Resources: Tutorials on firebase authentication, CSS tutorials on dropdown menus/hover text/etc.<br>
Assets: We got some cute icons from https://fontawesome.com and http://glyphicons.com<br>
Insects: No bugs to report as far as we know!<br>

## our application's utility

We bounced ideas back and forth and eventually talked about making some kind of social media calendar that would help students manage their time more efficiently. In college, academic pressures can get very overwhelming to the point of suffocation for some students. The fact that most Duke undergrads plan social events as a chore made us realize how important effective time management is in these four years.

We wanted to carry this issue over to a popular tradition at Duke: tenting. Students of all backgrounds participate in Duke's most outrageous event of the year, and some even start planning for it months in advance. For those who may not be as lucky (or as devoted), scheduling tenting shifts can be another menial task to add to their pile of Things They Don't Want To Do But Feel Socially Obligated To.

With k-vite, we wanted to work towards building an application in the future that could even organize tenting groups for those who have difficulty finding one, or one that could organize relaxing events at Cameron that students can attend while fulfilling their tenting responsibilities. (Hench the name k-vite...like an e-vite...get it?)

## instructions

The easiest way to see our application is through our public site: https://duke-compsci290-spring2018.github.io/final-project-team-29. You can view it as either a guest, user, or admin. Anyone can be a user for our application; simply register using the platform. For viewing admin privileges, use the creative combination below:

Email: admin<br>
Password: password

If you think code is beautiful and want to run it locally, here are some tips!

1. Clone the git repository by typing this in your terminal:
```
git clone https://github.com/duke-compsci290-spring2018/final-project-team-29
```
Or you can download it physically via that link.

2. Download Node (or update a probably old version)

3. Install all necessary packages, modules, dependencies with the following command:
```
npm install
```

4. If you want to tweak our code and see the changes, you can use your local host server with the following command:
```
npm run dev
```

## data authenticity

Since tenting season is over, it was difficult getting the actual availability of tenting participants and modeling our application similar to how tenting functions with twelve members planning their shifts all simultaneously. We decided to instead use fake datasets to mimic how events (specifically basketball games) would be displayed on our other calendars. Members participating in tenting would also be notified of these events, and could see them along with their individual tenting schedule.

The JSON files that we used to reference this data can be found at these two links:<br>
https://duke-compsci290-spring2018.github.io/final-project-team-29/src/data/mens_bball.json<br>
https://duke-compsci290-spring2018.github.io/final-project-team-29/src/data/womens_bball.json

## pros/cons of frameworks

We went into the project with the idea that we were going to use Node and Vue since we had been using and learning them in class in great detail. Using components in Vue made it very easy for us to break the sections of authorization down into Guest, User, and Admin. Along with components we used routing to accomplish our main goal of being able to display multiple calendars and having different user abilities, so we think that Node made this possible with its module functionality.

We relied on Firebase for user authentication and for storing our main data. One of the benefits of using Firebase for our code was that we made one huge array for tenting teams, which contains all the information about each team and each person within a team. This helped us a lot when we had to constantly update and read data because we were taking data from the same place each time.