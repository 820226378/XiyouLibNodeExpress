/**
 * Created by 国正 on 2014/7/11.
 */
var request = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');

function userInfo(session, callback) {
    if(session=='' || session==null){
        callback('Not Login');
    }
    request
    (
        {
            uri: 'http://222.24.3.7:8080/opac_two/reader/reader_set.jsp',
            encoding: null,
            headers: {
                Cookie: session
            }
        }, function (err, res, body) {
            if (err) {
                callback('Server Error');
            }
            var rawHtml = iconv.decode(body, 'GB2312');

            var $ = cheerio.load(rawHtml);

            var infoTable = $('table[width=600]');

            var id = $(infoTable.children()[0].children[3]).text().trim();

            var name = $(infoTable.children()[3].children[3]).text().trim();

            var from = $(infoTable.children()[8].children[3]).text().trim();

            var to = $(infoTable.children()[9].children[3]).text().trim();

            var readerType = $(infoTable.children()[10].children[3]).text().trim();

            var department = $(infoTable.children()[11].children[3]).text().trim();

            var debt = $(infoTable.children()[12].children[3]).text().trim();

            var userInfo =
            {
                'ID': id,
                'Name': name,
                'From': from,
                'To': to,
                'ReaderType': readerType,
                'Department': department,
                'Debt': debt * 1
            };

            //console.log(userInfo);
            callback(userInfo);
        }
    )
};

module.exports = userInfo;