const Poll = require("./pollModel");

exports.addPoll = async (req, res) => {
  const newQue = new Poll(req.body);
  try {
    const addedQue = await newQue.save();
    res.json({ success: true, addedQue });
  } catch (error) {
    console.log(error);
  }
};

exports.getPoll = async (req, res) => {
  try {
    const poll = await Poll.find().sort({ createdAt: -1 });
    res.json({ poll: poll[0] });
  } catch (error) {
    console.log(error);
  }
};

exports.getPolls = async (req, res) => {
  try {
    const polls = await Poll.find().sort({ createdAt: -1 });
    res.json({ success: true, polls });
  } catch (error) {
    console.log(error);
  }
};

exports.answerPoll = async (req, res) => {
  const answer = req.body.answer;
  const pollId = req.params.id;

  try {
    const poll = await Poll.findById(pollId);

    if (answer === "yes") {
      poll.yes++;
      poll.total++;
      poll.yes_percentage = (poll.yes / poll.total).toFixed(2) * 100;
      poll.no_percentage = 100 - poll.yes_percentage;
    } else {
      poll.no++;
      poll.total++;
      poll.no_percentage = (poll.no / poll.total).toFixed(2) * 100;
      poll.yes_percentage = 100 - poll.no_percentage;
    }

    const updatePoll = await Poll.findByIdAndUpdate(pollId, poll, {
      new: true,
    });

    res.json({ succss: true, poll: updatePoll });
  } catch (error) {
    console.log(error);
  }
};
