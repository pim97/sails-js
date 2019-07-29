module.exports = {


  friendlyName: 'View available things',


  description: 'Display "Available things" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/things/available-things'
    }

  },


  fn: async function () {

    var me = await User.findOne({
      id: this.req.me.id
    })
    .populate('friends');

    var friendIds = _.map(me.friends, 'id');

    var things = await Thing.find({
      or: [
        { owner: this.req.me.id },
        { owner: { in: friendIds}}
      ]
    });

    // Respond with view.
    return { things };

  }


};
