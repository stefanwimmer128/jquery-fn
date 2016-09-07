/*
 * Copyright (c) 2016, Stefan Wimmer
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

/**
 * jquery-fn 1.0.0-beta.2
 * @author Stefan Wimmer <stefanwimmer128@gmail.com>
 */

($ =>
{
    const root = this,
        $fn = $.$fn || {};
    
    Object.assign($fn, {
        global: () => root.$fn = $fn,
        
        invert: fn => (...args) => ! fn(...args),
        
        each: fn => array => array.forEach(fn),
        
        map: fn => array => array.map(fn),
        
        filter: fn => array => array.filter(fn),
        
        reject: fn => array => array.filter($fn.invert(fn)),
        
        find: fn => array => array.find(fn),
        
        reduce: (fn, start0) => (array, start1 = start0) => array.reduce(fn, start1),
        
        some: fn => array => array.some(fn),
        
        every: fn => array => array.every(fn),
        
        sort: fn => array => array.sort(fn),
        
        resolve: (generator) =>
        {
            const itr = generator();
            
            (function parse(x)
            {
                if (! x.done)
                    x.value.then(value => parse(itr.next(value)));
            })(itr.next());
        },
        
        mapKey: key => $fn.map(x => x[key]),
        
        sum: (...args) => args.reduce((sum, arg) => sum + arg, 0),
        
        curry: (fn) => function curry(arg, args = [])
        {
            args.push(arg);
            
            if (args.length == fn.length)
                return fn(...args);
            
            return arg => curry(arg, args);
        },
        
        uncurry: (fn) => (...args) =>
        {
            let val = fn;
            
            for (const arg of args)
                val = val(arg);
            
            return val;
        },
    });
    
    $.$fn = $fn;
})(jQuery);
