import { expect } from 'chai';
import { middleware } from '../src';

const options = item => ({
    status: (status) => {
        item.status = status;
        return options(item);
    },

    send: (value) => {
        item.body = value;
        return item;
    }
});

const res = options({});
const req = {
    params: {
        num: '1213121',
        uuid: '5808bee3-8b70-42be-9684-89c9450b4154',
        text: 'string',
        enum: 'start'
    }
};

const next = () => true;

describe('UUID', () => {
  it('should fails', () => {
    const validator = middleware(req, res, next)
                            .isUUID('num')
                            .check();
    expect(validator).to.eql({ status: 400,
      body:
       { errors: [ 'num must be a UUID' ],
         message: 'invalid parameter(s)',
         status: 'error' } });
  });

  it('should pass', () => {
    const validator = middleware(req, res, next)
                            .isUUID('uuid')
                            .check();
    expect(validator).to.eql(true);
  });
});

describe('Number', () => {
  it('should fails', () => {
    const validator = middleware(req, res, next, {message: 'error is found', data: {}})
                            .isNumber('text')
                            .check();

    expect(validator).to.eql({ status: 400,
      body:
       { "data": {
       "errors": [
          "text must be a number"
        ]
        },
        "message": "error is found"} });
    });
  it('should pass', () => {
    const validator = middleware(req, res, next)
                            .isNumber('num')
                            .check();
    expect(validator).to.eql(true);
  });
});

describe('Enum', () => {
  it('should fails', () => {
    const validator = middleware(req, res, next)
                            .isEnum('enum', ['enum', 'number'])
                            .check();
    expect(validator).to.eql({ status: 400,
      body:
       { "errors": [
          "enum must be be one of these: enum,number"
        ],
        "message": "invalid parameter(s)",
        "status": "error"} });
    });
    
    it('should pass', () => {
      const validator = middleware(req, res, next)
      .isEnum('enum', ['start'])
      .check();
      console.log(validator.errors);
    expect(validator).to.eql(true);
  });
});