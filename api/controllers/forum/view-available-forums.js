module.exports = {


  friendlyName: 'View available forums',


  description: 'Display "Available forums" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/forum/available-forums'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
