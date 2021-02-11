/*
Copyright (C) 2021  Adebowale35
*/

const { ShardingManager } = require('discord.js');
const { emojies } = require('./settings/config');
const { token } = require('./settings/config.json')
const disshard = new ShardingManager('./index.js', {
  token: token,
  totalShards: 'auto'
});
disshard.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`))
disshard.spawn()