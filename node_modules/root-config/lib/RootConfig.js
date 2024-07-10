const os = require('os')
const path = require('path')
const Joi = require('joi')
const fs = require('fs-extra')
const cloneDeep = require('clonedeep')
const merge = require('deepmerge')

const mergeArrayWithDedupe = (a, b) => Array.from(new Set([...a, ...b]))
const mergeOptions = {
  arrayMerge: mergeArrayWithDedupe
}
const isObject = val => val && typeof val === 'object'
const isArray = val => val && Array.isArray(val)

class RootConfig {
  /**
   * constructor主要验证schemaFunc的可行性
   */
  constructor(rcFileName, schemaFunc) {
    this.rcFileName = rcFileName

    // 支持输入返回function和object，并必须返回Joi schema对象，否则报错
    if(typeof schemaFunc === 'function'){
      this.schema = schemaFunc(Joi)
    }else if(typeof schemaFunc === 'object'){
      this.schema = schemaFunc
    }else{
      throw new Error(`${schemaFunc}必须为Joi schema对象或返回Joi schema对象的函数`)
    }
    if (!(this.schema instanceof Joi.constructor)) {
      throw new Error(`${schemaFunc}必须为Joi schema对象或返回Joi schema对象的函数`)
    }
    this.rcPath = path.join(os.homedir(), this.rcFileName)
  }

  /**
   * loadOptions()用于从全局配置文件中读取配置对象
   */
  loadOptions() {
    let options
    if (fs.existsSync(this.rcPath)) {
      try {
        options = JSON.parse(fs.readFileSync(this.rcPath, 'utf-8'))
      } catch (e) {
        throw new Error(`~/${this.rcFileName}同的json格式可能书写有错，请检查`)
      }

      Joi.validate(options, this.schema, err => {
        if (err) {
          throw new Error(`~/${this.rcFileName}配置有误，请删除后重新生成`)
        }
      })
      return options
    } else {
      return {}
    }
  }

  /**
   * loadOptions()将新添加的配置对象写入全局配置文件
   */
  saveOptions(toSave) {
    // 使用cloneDeep保存一份副本，以免影响原来配置。
    const oldOptions = cloneDeep(this.loadOptions())
    // rawOptions用来保存深合并后的配置对象
    const rawOptions = oldOptions || {}

    Object.keys(toSave).forEach(key => {
      const originalValue = oldOptions[key]
      const newValue = toSave[key]
      // 标准深合并操作：有则更新，无则新建，数组合并，对象回调
      if (isArray(originalValue) && isArray(newValue)) {
        rawOptions[key] = mergeArrayWithDedupe(originalValue, newValue)
      } else if (isObject(originalValue) && isObject(newValue)) {
        rawOptions[key] = merge(originalValue, newValue, mergeOptions)
      } else {
        rawOptions[key] = newValue
      }
    })


    // 骚操作： 不副合Joi表单验证被剔除
    const schema = this.schema.options({ stripUnknown: { objects: true, arrays: true } })

    const { error, value: newConfig } = Joi.validate(rawOptions, schema)

    if(error){
      throw new Error(error)
    }

    // 存入旧文件
    try {
      fs.ensureFileSync(this.rcPath)
      fs.writeFileSync(this.rcPath, JSON.stringify(newConfig, null, 2))
    } catch (e) {
      console.error(`无法写入${this.rcFileName}\n${e.message}`)
    }
  }

}

module.exports = RootConfig
