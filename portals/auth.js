
module.exports = {
    VUE_APP_BASE_URL: 'http://localhost:8080',
    VUE_APP_CLIENT_ID: 'eyJpdiI6InhFeGJLRENvK1lkajdxaVNVOVNvTkE9PSIsInZhbHVlIjoiSlhCS0dhMWVOb0dUajl3aTB1dm5cL1E9PSIsIm1hYyI6IjZhYWU1ZjhmYjU3ZTIxNzI5Njc2MjcxMGEzZDY0ZTY2MzQwZDM3MTVjNDUzYzg4ZDI4YzIwNjZiNzJhNmJiM2MifQ==',
    VUE_APP_DOMAIN_PREFIX:'/',
    VUE_APP_ENTRY: './src/entries/auth.js',
    VUE_APP_OUTPUT_DIR: __dirname + './../dist/auth', // This for assets [If you want to store the assets at s3 or other storage]
    VUE_APP_INDEX_PATH: __dirname+ './../dist/auth/index.html', // Here you can define the index file path.
    VUE_APP_PORT: 8080,
    VUE_APP_API_BASE_URL: 'http://localhost/lq_server_sample/public/api/',
    VUE_APP_STORAGE_URL: "http://localhost/lq_server_sample/public/storage/"
}