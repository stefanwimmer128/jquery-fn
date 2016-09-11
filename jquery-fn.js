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
 * jquery-fn 1.0.0-rc.1
 * @author Stefan Wimmer <stefanwimmer128@gmail.com>
 */

(($, global) =>
{
    const $fn = $.$fn || {};
    
    Object.assign($fn, {
        global: () =>
            global.$fn = $fn,
        
        invert: fn =>
            (...args) =>
                ! fn(...args),
        
        each: fn =>
            array =>
                array.forEach(fn),
        
        map: fn =>
            array =>
                array.map(fn),
        
        filter: fn =>
            array =>
                array.filter(fn),
        
        reject: fn =>
            array =>
                array.filter($fn.invert(fn)),
        
        find: fn =>
            array =>
                array.find(fn),
        
        reduce: (fn, start0) =>
            (array, start1 = start0) =>
                array.reduce(fn, start1),
        
        some: fn =>
            array =>
                array.some(fn),
        
        every: fn =>
            array =>
                array.every(fn),
        
        sort: fn =>
            array =>
                array.sort(fn),
        
        resolve: gen =>
        {
            const itr = gen();
            
            (function resolve(x)
            {
                if (! x.done)
                    x.value.then(value =>
                        resolve(itr.next(value))
                    );
            })(itr.next());
        },
        
        mapKey: key =>
            $fn.map(x =>
                x[key]
            ),
        
        sum: (...args) =>
            args.reduce((sum, arg) =>
                Array.isArray(arg) ? sum + $fn.sum(...arg) : sum + arg, 0
            ),
        
        curry: (fn, n) =>
            (arg, args = []) =>
            {
                args.push(arg);
                
                return args.length === (n || fn.length)
                    ? fn(...args)
                    : arg => $fn.curry(fn, n)(arg, args);
            },
        
        uncurry: fn =>
            (...args) =>
            {
                let val = fn;
                
                for (const arg of args)
                    val = val(arg);
                
                return val;
            },
        
        extend: (obj, override = false) =>
            Object.assign($fn, override ? obj : Object.assign(obj, $fn)),
    });
    
    $.$fn = $fn;
})(jQuery, this);
