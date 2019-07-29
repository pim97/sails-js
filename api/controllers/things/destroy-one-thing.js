module.exports = {


  friendlyName: 'Destroy one thing',


  description: 'Delete one thing from the database',


  inputs: {
    id: {
      type: 'number',
      required: true,
    }
  },


  exits: {
    forbidden: {
      description: 'The user making this request is not the same as the owners item',
      responseType: 'forbidden'
    },

    notFound: {
      description: 'Deleting some id when it doesn\'t exist',
      responseType: 'notFound'
    }
  },


  fn: async function (inputs) {

    var thing = await Thing.findOne({
      id: inputs.id
    });

    if (!thing) {
      throw 'notFound';
    }

    if (thing.owner !== this.req.me.id) {
        throw 'forbidden';
    }

    await Thing.destroy({id: inputs.id});

    // All done.
    return;

  }


};
