jest.mock('fs')

const fs = require('fs-extra')
const path = require('path')
const os = require('os')
const RootConfig = require('../RootConfig')

describe('简单的配置文件', () => {
  const rcName = '.simplerc'

  const simpleConfig = new RootConfig(rcName, (Joi) => {
    return Joi.object({
      username: Joi.string().min(2).max(30),
      birthyear: Joi.number().integer().min(1900).max(2019),
      presets: Joi.object({
        root: Joi.boolean()
      })
    })
  })

  it('获取地址', () => {
    expect(simpleConfig.rcPath).toBe(path.join(os.homedir(), rcName))
  })

  it('读取空配置', () => {
    expect(simpleConfig.loadOptions()).toMatchObject({})
  })

  it('写入配置并读取', () => {
    simpleConfig.saveOptions({
      username: 'test'
    })

    simpleConfig.saveOptions({
      birthyear: 1990
    })

    expect(simpleConfig.loadOptions()).toEqual({
      username: 'test',
      birthyear: 1990
    })
  })
})

describe('高级配置', () => {
  it('1. 是否支持object模式？', () => {
    const Joi = require('joi')
    const rcName = '.test1rc'
    const test1Config = new RootConfig(rcName, Joi.object({
      username: Joi.string().min(2).max(30).required(),
      birthyear: Joi.number().integer().min(1900).max(2019)
    }))
  })

  it('2.是否返回格式不正确时报错？', () => {
    const rcName = '.test2rc'
    expect(() => {
      const test2Config = new RootConfig(rcName, () => {
      })
    }).toThrow()
  })

  it('3.是否执行了对象深合并操作？', () => {
    const rcName = '.test3rc'
    const test3Config = new RootConfig(rcName, (Joi) => {
      return Joi.object({
        username: Joi.string().min(2).max(30).required(),
        birthyear: Joi.number().integer().min(1900).max(2019),
        address: Joi.object({
          city: Joi.string(),
          street: Joi.string(),
          zipcode: Joi.number().integer()
        }),
        bankcard: Joi.array().items(Joi.number().integer()),
      })
    })
    test3Config.saveOptions({
      username: 'test',
      birthyear: 1990,
      address: {
        city: 'Beijing'
      },
      bankcard: [1001, 1002]
    })

    test3Config.saveOptions({
      username: 'test',
      birthyear: 1990,
      address: {
        city: 'Shanghai',
        street: 'XuJiaHui street',
        zipcode: 100000
      },
      bankcard: [1001, 1003]
    })

    expect(test3Config.loadOptions()).toEqual({
      username: 'test',
      birthyear: 1990,
      address: {
        city: 'Shanghai',
        street: 'XuJiaHui street',
        zipcode: 100000
      },
      bankcard: [1001, 1002, 1003]
    })
  })

  it('4.是否将存入对象修剪为符合规范的对象？', () => {
    const rcName = '.test4rc'
    const test4Config = new RootConfig(rcName, (Joi) => {
      return Joi.object({
        username: Joi.string().min(2).max(30).required(),
        birthyear: Joi.number().integer().min(1900).max(2019),
        address: Joi.object({
          city: Joi.string().required(),
          street: Joi.string(),
          zipcode: Joi.number().integer(),
          configs: Joi.object().required()
        }),
        bankcard: Joi.array().items(Joi.number().integer())
      })
    })

    test4Config.saveOptions({
      username: 'test',
      password: 'adfgh',
      foo: 'boo',
      birthyear: 1990,
      address: {
        city: 'Beijing',
        building: 'ShiMao Center',
        bath:'1'
      },
      bankcard: [1001, 'something']
    })

    expect(test4Config.loadOptions()).toEqual({
      username: "test",
      birthyear: 1990,
      address: {
        city: 'Beijing'
      },
      bankcard: [1001]
    })
  })
})
