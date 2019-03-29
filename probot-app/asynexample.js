// https://blog.cloudboost.io/execute-asynchronous-tasks-in-series-942b74697f9c

function seriesDemo(req, res, next) {
  const saveRequest = async() => {
    const company = new Company({
      name: 'FullStackhour'
    });
    const savedCompany = await company.save();
    const job = new Job({
      title: 'Node.js Developer',
      _company: savedCompany._id
    });
    const savedJob = await job.save();
    const application = new Application({
      _job: savedJob._id,
      _company: savedCompany._id
    });
    const savedApp = await application.save();
    const licence = new Licence({
      name: 'FREE',
      _application: savedApp._id
    });
    const savedLic = await licence.save();
    return {
      company: savedCompany,
      job: savedJob,
      application: savedApp,
      savedLic: licence
    };
  }
  saveRequest()
    .then(result => {
      return res.json(result);
    })
    .catch(err => next(err));
}