import express from "express";
import faker from "faker";
import searchEngine from "search-engine";
import localtunnel from "localtunnel";

const app = express();

app.set("view engine", "ejs");

app.get("/", (req,res) => res.render(`${__dirname}/views/index`));

app.get("/api/randomlist", (req,res) => {
    let randomJSON = {
        listCount: 10000,
        list: [],
    };
    let maximumCount = 10000;
    let trial = 0;
    let itemCount = 0;
    while(itemCount < 50) {
        if(!Object.keys(req.query).length) {
            randomJSON.list.push({
                item: `${faker.name.firstName()}`
            });
            itemCount++;
        } else {
            console.log("current trial count: " + trial + req.query.query);
            if(trial == maximumCount) break;
            let currentItem = faker.name.firstName();
            if( new RegExp(`^${req.query.query}`, "i").test(currentItem) ) {
                randomJSON.list.push({
                    item: `${currentItem}`
                });
                itemCount++;
            }
            trial++;
        }
    }
    console.log(randomJSON);
    res.json(randomJSON);
})
app.listen(3000, console.log("your application has started to listen on port 3000"));