const { getUserId } = require("../controllers/auth");

exports.createOne = (Model) => async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const userId = getUserId(token);
  req.body.user = userId;

  try {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getOne = (Model, popOptions) => async (req, res, next) => {
  try {
    const query = Model.findById(req.params.id);

    if (popOptions) {
      query.populate(popOptions);
    }
    const doc = await query;

    if (!doc) {
      return next(
        res.status(404).json({
          status: "fail",
          error: "Not found",
        })
      );
    }

    res.status(200).json({
      success: true,
      data: doc,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAll = (Model, popOptions) => async (req, res, next) => {
  try {
    let filter = {};

    if (req.params.postId) filter.post = req.params.postId;
    if (req.params.userId) filter.user = req.params.userId;

    const query = Model.find(filter);
    if (popOptions) {
      query.populate(popOptions);
    }

    const docs = await query;

    if (!docs) {
      return next(
        res.status(404).json({
          status: "fail",
          error: "Not found",
        })
      );
    }

    res.status(200).json({
      success: true,
      data: docs,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(
        res.status(404).json({
          status: "fail",
          error: "Not found",
        })
      );
    }
    res.status(200).json({
      success: true,
      data: doc,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(
        res.status(404).json({
          status: "fail",
          error: "Not found",
        })
      );
    }
    res.status(200).json({
      success: true,
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

exports.findAllById = (Model, id) => async (req, res, next) => {
  try {
    const docs = await Model.find({ _id: { $in: id } });
    if (!docs) {
      return next(
        res.status(404).json({
          status: "fail",
          error: "Not found",
        })
      );
    }
    res.status(200).json({
      success: true,
      data: docs,
    });
  } catch (err) {
    next(err);
  }
};
