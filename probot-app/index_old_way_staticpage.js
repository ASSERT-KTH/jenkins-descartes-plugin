var my_context

module.exports = app => {

  app.log('Yay, the app was loaded!')

  app.on('push', async context => {

    var jenkins = require('jenkins')({ baseUrl: 'http://admin:admin@130.237.59.170:8080', crumbIssuer: true })

    jenkins.job.build('test', function (err, data) {
      if (err) throw err
      console.log('queue item number', data)
    })

    my_context = context  // save payload

    app.log('push event fired')
    app.log(context.payload)

  })
////////////SETUP PARSING /////////////////////////////////////////////

 // var bodyParser = require('body-parser')

  const router = app.route('/')
  router.use(require('express').static('public'))

  //Here we are configuring express to use body-parser as middle-ware.
//  router.use(bodyParser.urlencoded({ extended: true }))
//  router.use(bodyParser.json())


//var express = require('express')
var bodyParser = require('body-parser')

//var app = express()

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
//var urlencodedParser = bodyParser.urlencoded({ extended: false })

  router.post('/app', jsonParser,async function (req, res) {

    var jsonQ = require('jsonq')
    var glob = require('glob')

    // files is an array of filenames.
    glob('../../../../../var/lib/jenkins/workspace/test/target/pit-reports/*/methods.json', function (err, files) {

      if (err) {
        console.log(err)
      } else {

        // a list of paths to javaScript files in the current working directory
        var jsonfile = files.slice(-1).pop()

        console.log(jsonfile)

        // nu vill jag skapa ett json object från filen.... så ja kan parsa..
        const fs = require('fs')

        let rawdata = fs.readFileSync(jsonfile)
        let methodsjson = JSON.parse(rawdata)
        var jsonQobj = jsonQ(methodsjson)

        // jenkins parsing
    //    let jenkins_json = JSON.stringify(req.body) // jenkins info...
        console.log(req.body)

        var jenkinsobj = jsonQ(req.body)

        var jenkins_status = jenkinsobj.find('build').find('status').firstElm().toLowerCase();

        var jenkins_all = jenkinsobj.find('build').find('url').firstElm()
        var jenkins_info = jenkins_all.replace(/\//g, "_")

        // replace / with _
       console.log('jenk_:'+ jenkins_info)
       console.log('jenk_status:'+ jenkins_status)

        var package = jsonQobj.find('package')
        p_methods = jsonQobj.find('methods').find('classification')

        console.log(p_methods.value())

        var tested = 0
        var partial = 0
        var not_covered = 0

        jsonQ.each(p_methods.value(), function (key, value) {
          console.log(key + ' : ' + value)

          if (value === 'tested')
            tested++

          if (value === 'partially-tested')
            partial++

          if (value === 'not-covered')
            not_covered++
        })

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
        var createHTML = require('create-html')

        var html = createHTML({
          lang: 'en',
          dir: 'rtl',
          head: '<meta name="description" content="example">',
          body: '<p>Commit ID: ' + my_context.payload.head_commit.id + '</p><p>Package: ' + package.firstElm() + '</p><p>Tested: ' + tested + '</p><p>Partially-tested: ' + partial + '</p><p>Not-covered: ' + not_covered + '</p>' + '<div id="root"></div><script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script><script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script><script src="../like_button.js"></script><script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>'
        })

        fs.writeFile(__dirname + '/public/my_index_' + my_context.payload.head_commit.id + jenkins_info +'.html', html, function (err) {
          if (err) console.log(err)
        })

       console.log('id:'+my_context.payload.head_commit.id)

        const commitstatus = my_context.repo({

          owner: 'martinch-kth',
          repo: 'dhell',
          sha: my_context.payload.head_commit.id,
          description: jenkins_info,
          context: 'CI/jenkins',
          target_url: 'http://130.237.59.170:3000/my_index_' + my_context.payload.head_commit.id + jenkins_info +'.html',
          state: jenkins_status
        })

        return my_context.github.repos.createStatus(commitstatus)
      }
    })

  })

}
