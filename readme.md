## About
#mood is a website that takes in how you feel and shows you the hexadecimal color representation of your current emotion. Input your happy color, your unhappy color, and tell it how you feel on a scale of Really Sad to Really Happy. You can also take a snapshot of this color and see a history of all your previous colors. The result is a rainbow of emotion, a colorful visualization of your progression of mood over time.

## The making of #mood
Pearl Hacks 2018 was my second time at the UNC hackathon. The previous year I had made [Lukewarm Greeting Cards](http://dainryoo.github.io/lukewarm/) and was very proud of myself for 1) successfully completing something and 2) making something fun and having fun! So I aimed to do the same this year.

I initially came into the hackathon wanting to make a digital mood ring: tell the website how you feel (e.g. "I'm feeling a little angry!") and the website shows you the corresponding color (e.g. "#702F2A"). But then I eventually realized that specific colors don't necessarily mean the same thing for everyone. Also, emotions are a lot more complicated to map out than I had thought. So I simplified everything down to a very binary scale: the user inputs two colors and chooses a feeling between two extremes.

I was, like last year, very focused on making the site look good. My vision was to have the hexadecimal number be the star of the show. I was going for a graphic tee or mug design type of aesthetic. And, again, like my previous Pearl Hacks project, I wanted the site to look good enough so that someone could screenshot it and use it as a decent wallpaper for their phone or PC.

## How it works
The website is basically just a colorful calculator. It takes a weighted average of your happy color value and your sad color value, putting more weight on whichever one you're feeling more of. So if you're feeling kinda down in the dumps, the multiplier might be something like 0.2 for the happy color, which means 0.8 for the sad color. 0.2 * happy + 0.8 * sad = the resulting color of your emotion.

I got to revisit math, do a little bit of hex to binary conversion, all that good stuff.

## In retrospect
I had actually wanted to try implemeting the [Text Analytics API](http://azure.microsoft.com/en-us/services/cognitive-services/text-analytics/) from Microsoft Azure, which was perfect because it used the same positive to negative, 0 to 1 scale. If I hadn't run out of time, I definitely would've tried messing with it; the user would then have two options to input their emotion; the very direct slider currently on the website, and the more subtle text analysis that could've been done by asking the user to talk about their day.

I'm also now realizing that the four tiny icons on the bottom aren't super intuitive and sometimes aren't very visible, which adds to the confusion. I generally like the look of white text on a colored background, but unforunately this only works if the color isn't too light. It would've been nice to adjust for that and change the font color to something darker if the color becomes a certain brightness.

The site looks a little cramped on my tiny phone, but it looks pretty great on a laptop if I do say so myself. Overall, I had a good time at the hackathon, got to finish something, and still got a solid amount of sleep on top of it all.