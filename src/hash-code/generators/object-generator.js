/*
 * Copyright (C) 2017 Alasdair Mercer, Skelp
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

'use strict'

var HashHashCodeGenerator = require('./hash-generator')

/**
 * An implementation of {@link HashHashCodeGenerator} that supports plain old object values.
 *
 * @protected
 * @constructor
 * @extends HashHashCodeGenerator
 */
var ObjectHashCodeGenerator = HashHashCodeGenerator.extend({

  /**
   * @inheritdoc
   * @override
   * @memberof ObjectHashCodeGenerator#
   */
  getEntries: function getEntries(context) {
    var entries = []
    var hash = context.value
    var options = context.options
    var value

    for (var name in hash) {
      if (!options.skipInherited || Object.prototype.hasOwnProperty.call(hash, name)) {
        value = hash[name]

        if ((typeof value !== 'function' || !options.skipMethods) && options.filterProperty(name, value, hash)) {
          entries.push([ name, value ])
        }
      }
    }

    return entries
  },

  /**
   * @inheritdoc
   * @override
   * @memberof ObjectHashCodeGenerator#
   */
  supports: function supports(context) {
    return context.type === 'object'
  }

})

module.exports = ObjectHashCodeGenerator
