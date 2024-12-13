// const verifyConditionCreateInsur = async(req, res, next) => {
//     const body = req.body
//     const client = req.clientInfor
//     const{data: {
//         duration
//     }} = body
//
// }
// const {redisConfig} = container.resolve('config')
// let redis = null
// if(redisConfig.sentinel) {
//     const redisSenitel = redisConfig.sentitel.split('')
//     const senitels = redisSenitel.map(i => {
//         const [host, port] = i.split(':')
//         return {host: host, port: port || 80}
//     })
//
//     redis = new Redis({
//         entinels,
//         name: redisConfig.clusterName,
//         password: redisConfig.clusterPassword,
//         db: redisConfig.db
//
//     })
// }
//
// const getToken = async( )=> {
//     const {data, statusCode }  = await userHelper.getToken()
// }
//
// const getInsur = async() => {
//     const options = {
//         headers: {
//             Authorization: token
//         },
//         url: `${urlConfig.insuranceDomain}/masterdatas/insur-vcx`,
//         json: true,
//         method: 'GET'
//     }
//     let response = await request(options)
//     if (response?.statusCode === httpCode.UNAUTHORIZED) {
//         options.headers.Authorization = token
//         response = await request(options)
//     }
//     return response
// }
//
// const deleteClient = async(req, res) => {
//     const {id} = req.params
//
//     if(!id) {
//
//     }
// }
//
// const getClient = async (req, res) => {
//     try {
//         let {
//             page,
//             perPage,
//             sort,
//             ids
//         } = req.query
//         page = +page || 1
//         perPage = +perPage || 10
//         sort = +sort === 0 ? { _id: 1 } : +sort || { _id: -1 }
//         const skip = (page - 1) * perPage
//         const search = { ...req.query }
//         if (ids) {
//             if (ids.constructor === Array) {
//                 search.id = { $in: ids }
//             } else if (ids.constructor === String) {
//                 search.id = { $in: ids.split(',') }
//             }
//         }
//         delete search.ids
//         delete search.page
//         delete search.perPage
//         delete search.sort
//         const pipe = {}
//         Object.keys(search).forEach(i => {
//             const vl = search[i]
//             const pathType = (Client.schema.path(i) || {}).instance || ''
//             if (pathType.toLowerCase() === 'objectid') {
//                 pipe[i] = ObjectId(vl)
//             } else if (pathType === 'Number') {
//                 pipe[i] = +vl
//             } else if (pathType === 'String' && vl.constructor === String) {
//                 pipe[i] = new RegExp(vl, 'gi')
//             } else {
//                 pipe[i] = vl
//             }
//         })
//         const data = await clientRepo.getClient(pipe, perPage, skip, sort)
//         const total = await clientRepo.getCount(pipe)
//         res.status(httpCode.SUCCESS).send({
//             perPage,
//             skip,
//             sort,
//             data,
//             total,
//             page
//         })
//     } catch (e) {
//         logger.e(e)
//         res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
//     }
// }
//
// const convertDataToSubmit = async(data, client) => {
//     const masterData = await masterDataReppo.find({uid:1})
//     const manufacturers = masterData?.manufacturers || []
//     const usages = masterData?.usages || []
//     const manufacture = manufacturers.find(m => m.code === data.car.manufacturer)
// }
//
// const submitApplication = async(req, res) => {
//     try {
//         const {
//             error,
//             value
//         } = await schemaValidator(req.body.data, 'Insurance')
//         if (error) {
//             return res.status(httpCode.BAD_REQUEST).send({ msg: error.message })
//         }
//         if (!value.car.license_plate && !value.car.vin_number) {
//             return res.status(httpCode.BAD_REQUEST).send({ msg: 'At least car.vin number or car.license plate' })
//         }
//         const data = {
//             application: await convertDataToSubmit(value, req.clientInfo),
//             uid: serverHelper.randomString(24),
//             clientId: req.clientInfo.clientId,
//             clientName: req.clientInfo.clientName,
//         }
//
//     }
//
