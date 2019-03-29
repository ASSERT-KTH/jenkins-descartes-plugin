    var jsonQ=require("jsonq");
    var glob = require("glob")
    
      // files is an array of filenames.
    glob('../../../../../var/lib/jenkins/workspace/test/target/pit-reports/*/methods.json', function (err, files) {

    if (err) {
        console.log(err);
    } else {

        // a list of paths to javaScript files in the current working directory
        //console.log(files);
        var jsonfile = files.slice(-1).pop()

        console.log(jsonfile)

    // nu vill jag skapa ett json object från filen.... så ja kan parsa..?
    const fs = require('fs');

    let rawdata = fs.readFileSync(jsonfile)  
//    let rawdata = fs.readFileSync('../../../../../var/lib/jenkins/workspace/test/target/pit-reports/201812181938/methods.json');  
    let methodsjson = JSON.parse(rawdata);  


   // var obj = require(filepath); // no need to add the .json extension
    var jsonQobj=jsonQ(methodsjson);

    var package = jsonQobj.find('package');

   // name = jsonQobj.find('name');

    var 
    //to print list of all name
   // console.log(name.value());

   // methods = jsonQobj.find('methods');

    //WARNING.. just a workaround for now to get amount of methods..since i cant get methods.lenght ..it gives = 1..which is true..i have to loop+count
   // console.log(name.length);

    //to partially-tested methods 
    p_methods = jsonQobj.find('methods').find('classification');

    console.log(p_methods.value())

    var tested = 0;
    var partial = 0;
    var not_covered = 0;
    

    jsonQ.each(p_methods.value(), function (key, value) {
        console.log(key + ' : ' + value);

       if (value === 'tested')
           tested++

       if (value === 'partially-tested')
           partial++

       if (value === 'not-covered')
           not_covered++
    });

    console.log(tested)
    console.log(partial)
    console.log(not_covered)

    //to filter methods that are only partially tested-- fnkar inte! vetej-- kanske förman kan inte filtrera på string värden..
    // DONT WORKS...somethingswrong..
//    console.log(filterdHub.value());
 //   filterdHub.each(function (index, path, value) {
 //       console.log(value);
 //       console.log(index);
//        console.log(path);
//    });

    //testa..funkar!!

    var createHTML = require('create-html')

var html = createHTML({
  lang: 'en',
  dir: 'rtl',
  head: '<meta name="description" content="example">',
  body: '<p>Title: '+ commit_id +'</p><p>Stats: '+ package.firstElm() +'</p><p>Tested: '+ tested +'</p><p>Partially-tested: '+ partial +'</p><p>Not-covered: '+ not_covered +'</p>'
})
                // + commit_id
    fs.writeFile('my_index_'+ commit_id +'.html', html, function (err) {
      if (err) console.log(err)
    })


    }
   });
