import { filesCrud } from './files.model';
import { userCrud } from '../user/user.model';


let files;
let filesNew;
let user;
let isMatched;

const filterfiles = async (ctx) => {
  try {
    files = await filesCrud.get({
      qr: { category: ctx.params.filter },
      populate: 'author category'
    });
  } catch (e) {
    ctx.throw(404, e.message);
  } finally {
    ctx.body = files;
  }
};

const filesCategory = async (ctx) => {
  try {
    files = await filesCrud.get({
      select: 'category -_id',
      populate: 'category'
    });
  } catch (e) {
    ctx.throw(404, e.message);
  } finally {
    ctx.body = files;
  }
};

const filesAll = async (ctx) => {
  try {
    files = await filesCrud.get({
      populate: 'author'
    });
  } catch (e) {
    ctx.throw(404, e.message);
  } finally {
    ctx.body = files;
  }
};

const myfiles = async (ctx) => {
  try {
    files = await userCrud.single({
      qr: { _id: ctx.state.user.uid },
      select: 'filess -_id',
      populate: 'filess'
    });
  } catch (e) {
    ctx.throw(404, e.message);
  } finally {
    ctx.body = files.filess;
  }
};

const userfiles = async (ctx) => {
  try {
    files = await userCrud.single({
      qr: { username: ctx.params.user },
      select: 'filess -_id',
      populate: 'filess'
    });
  } catch (e) {
    ctx.throw(404, e.message);
  } finally {
    ctx.body = files;
  }
};

const filesSingle = async (ctx) => {
  try {
    files = await filesCrud.single({
      qr: { _id: ctx.params.id },
      populate: 'author'
    });
  } catch (e) {
    ctx.throw(404, e.message);
  } finally {
    ctx.body = files;
  }
};

// const filesCreate = async (ctx) => {
//   console.log(ctx.request.body);
//   const filesData = Object.assign({
//     author: ctx.state.user.uid
//   }, ctx.request.body);
//   try {
//     filesNew = await filesCrud.create(filesData);
//   } catch (e) {
//     ctx.throw(422, e.message);
//   } finally {
//     try {
//       user = await userCrud.single({
//         qr: { _id: ctx.state.user.uid }
//       });
//     } catch (e) {
//       ctx.throw(422, e.message);
//     } finally {
//       user.filess.push(filesNew._id);
//       user.save();
//       ctx.body = {
//         body: filesNew,
//         message: 'Post is successful'
//       };
//     }
//   }
// };

const filesUpdate = async (ctx) => {
  try {
    user = await userCrud.single({
      qr: { _id: ctx.state.user.uid }
    });
    isMatched = user.filess.indexOf(ctx.params.id);
  } catch (e) {
    ctx.throw(422, e.message);
  } finally {
    if (isMatched !== -1) {
      try {
        files = await filesCrud.put({
          params: {
            qr: { _id: ctx.params.id }
          },
          body: ctx.request.body
        });
      } catch (e) {
        ctx.throw(422, e.message);
      } finally {
        ctx.body = {
          body: files,
          message: 'Post Updated..'
        };
      }
    } else {
      ctx.body = {
        message: 'Sorry you don\'t have right to edit this'
      };
    }
  }
};


//====================Shuvojit==================

const filesCreate = async (ctx) => {
  // console.log(ctx.request.body);
  try {
    filesNew = await filesCrud.create(ctx.request.body);
  } catch (e) {
    ctx.throw(422, e.message);
  } finally {
    token = await generateJwt({
      uid: filesNew._id
    });
    ctx.body = {
      acc_type: filesNew.acc_type,
      token,
      message: 'SignUp Successfull...'
    };
  }
};

const filesLogin = async (ctx) => {
  files = await filesCrud.single({
    qr: { email: ctx.request.body.email }
  });
  try {
    if (files) {
      Verifyfiles = await compareSync(ctx.request.body.password, files.password);
    }
  } catch (e) {
    ctx.throw(404, e.message);
  } finally {
    if (Verifyfiles) {
      token = await generateJwt({
        uid: files._id
      });
      ctx.body = {
        acc_type: files.acc_type,
        token,
        message: 'Login Successfull...'
      };
    }
  }
};



//=================Shuvojit======================







const filesDelete = async (ctx) => {
  try {
    user = await userCrud.single({
      qr: { _id: ctx.state.user.uid }
    });
    isMatched = user.filess.indexOf(ctx.params.id);
  } catch (e) {
    ctx.throw(422, e.message);
  } finally {
    if (isMatched !== -1) {
      try {
        files = await filesCrud.delete({
          params: {
            qr: { _id: ctx.params.id }
          }
        });
      } catch (e) {
        ctx.throw(422, e.message);
      } finally {
        ctx.body = {
          body: files,
          message: 'Deleted'
        };
      }
    } else {
      ctx.body = {
        message: 'Sorry you don\'t have right to delete this'
      };
    }
  }
};

export {
  filesAll,
  filesSingle,
  filesCreate,
  filesUpdate,
  filesLogin,
  filesDelete,
  myfiles,
  userfiles,
  filterfiles,
  filesCategory
};
