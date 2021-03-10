const graphql = require('graphql');
const _ = require('lodash');
const AssetDataModel = require('../models/assetdata');
const AssetTypeModel = require('../models/assettype');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLNonNull,
    GraphQLList
} = graphql;


const AssetDataType = new GraphQLObjectType({
    name: 'AssetData',
    fields: () => ({
        id: { type: GraphQLID },
        subtype: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        code: { type: new GraphQLNonNull(GraphQLString)},
        risk: { type: new GraphQLNonNull(GraphQLString)},
        units: { type: new GraphQLNonNull(GraphQLInt)},
        avgPrice: { type: new GraphQLNonNull(GraphQLFloat)},
        invested: { type: new GraphQLNonNull(GraphQLFloat) },
        currentPrice: { type: new GraphQLNonNull(GraphQLFloat)},
        value: { type: new GraphQLNonNull(GraphQLFloat) },
        type: { type: new GraphQLNonNull(GraphQLString) },
    })
});

const AssetType = new GraphQLObjectType({
    name: 'AssetType',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        data: { 
            type: new GraphQLList(AssetDataType),
            resolve(parent, args){
                return AssetDataModel.find({type: parent.name}, function(err, doc) {
                });
            }
         },
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        assetdata: {
            type: AssetDataType,
            args: { id: { type: GraphQLID}},
            resolve(parent, args){
              return  AssetDataModel.findById(args.id);
            }
        },
        assettype: {
            type: AssetType,
            args: { name: { type: new GraphQLNonNull(GraphQLString)}},
            resolve(parent, args){
                return AssetTypeModel.findOne({name: args.name}, function(err, doc) {
                });
            }
        },
        assetdatas: {
            type: new GraphQLList(AssetDataType) ,
            resolve(parent, args){
                return  AssetDataModel.find();
            }
        },
        assettypes: {
            type: new GraphQLList(AssetType) ,
            resolve(parent, args){
                return  AssetTypeModel.find();
              }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAssetData: {
            type: AssetDataType,
            args: { 
                type: { type: new GraphQLNonNull(GraphQLString)},
                subtype: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                code: { type: new GraphQLNonNull(GraphQLString)},
                risk: { type: new GraphQLNonNull(GraphQLString)},
                units: { type: new GraphQLNonNull(GraphQLInt)},
                avgPrice: { type: new GraphQLNonNull(GraphQLFloat)},
                invested: { type: new GraphQLNonNull(GraphQLFloat) },
                currentPrice: { type: new GraphQLNonNull(GraphQLFloat)},
                value: { type: new GraphQLNonNull(GraphQLFloat) },
            },
            resolve(parent, args){
              let assetData = new AssetDataModel({
                type: args.type,
                subtype: args.subtype,
                name: args.name,
                code: args.code,
                risk: args.risk,
                units: args.units,
                avgPrice: args.avgPrice,
                currentPrice: args.currentPrice,
                invested: args.invested,
                value: args.value,
              });
              //console.log(args.type)
              return assetData.save();
            }
        },
        addAssetType: {
            type: AssetDataType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args){
              let assetType = new AssetTypeModel({
                name: args.name,
              });
              return assetType.save();
            }
        },
        updateAssetData: {
            type: AssetDataType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID)},
                type: { type: new GraphQLNonNull(GraphQLString)},
                subtype: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                code: { type: new GraphQLNonNull(GraphQLString)},
                risk: { type: new GraphQLNonNull(GraphQLString)},
                units: { type: new GraphQLNonNull(GraphQLInt)},
                avgPrice: { type: new GraphQLNonNull(GraphQLFloat)},
                invested: { type: new GraphQLNonNull(GraphQLFloat) },
                currentPrice: { type: new GraphQLNonNull(GraphQLFloat)},
                value: { type: new GraphQLNonNull(GraphQLFloat) },
            },
            resolve(parent, args) {
              return AssetDataModel.findByIdAndUpdate(args.id, { type: args.type, subtype:args.subtype, name: args.name, invested: args.invested, value: args.value}, function (err) {
                if (err) return next(err);
              });
            }
          },
          updateAssetType: {
            type: AssetType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID)},
                name: { type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args) {
              return AssetTypeModel.findByIdAndUpdate(args.id, { name: args.name}, function (err) {
                if (err) return next(err);
              });
            }
          },
          removeAssetData: {
            type: AssetDataType,
            args: {
              id: {
                type: new GraphQLNonNull(GraphQLID)
              }
            },
            resolve(parent, args) {
              const remAssetData = AssetDataModel.findByIdAndRemove(args.id).exec();
              if (!remAssetData) {
                throw new Error('Error')
              }
              return remAssetData;
            }
          },
          removeAssetType: {
            type: AssetType,
            args: {
              id: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args) {
              const remAssetData = AssetTypeModel.findByIdAndRemove(args.id).exec();
              if (!remAssetData) {
                throw new Error('Error')
              }
              return remAssetData;
            }
          }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})