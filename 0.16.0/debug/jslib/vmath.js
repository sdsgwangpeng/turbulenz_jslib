// Copyright (c) 2009-2011 Turbulenz Limited

//
// Vector math library
//

var VMath =
{
    version : 1,

    // Default precision for equality comparations
    precision : 1e-6,

    FLOAT_MAX : Number.MAX_VALUE,

    select : function selectFn(m, a, b)
    {
        if (m)
        {
            return a;
        }
        else
        {
            return b;
        }
    },

    reciprocal : function reciprocalFn(a)
    {
        if (a !== 0.0)
        {
            return (1.0 / a);
        }
        else
        {
            throw "Division by zero";
        }
    },

    truncate : function truncateFn(value)
    {
        return parseInt(value, 10);
    },

    //
    // Vector3
    //
    v3BuildZero : function v3BuildZeroFn(dst) {
        if (!dst)
        {
            dst = [];
        }
        dst[0] = 0.0;
        dst[1] = 0.0;
        dst[2] = 0.0;
        return dst;
    },

    v3BuildOne  : function v3BuildOneFn(dst) {
        if (!dst)
        {
            dst = [];
        }
        dst[0] = 1.0;
        dst[1] = 1.0;
        dst[2] = 1.0;
        return dst;
    },

    v3BuildXAxis : function v3BuildXAxisFn(dst) {
        if (!dst)
        {
            dst = [];
        }
        dst[0] = 1.0;
        dst[1] = 0.0;
        dst[2] = 0.0;
        return dst;
    },

    v3BuildYAxis : function v3BuildYAxisFn(dst) {
        if (!dst)
        {
            dst = [];
        }
        dst[0] = 0.0;
        dst[1] = 1.0;
        dst[2] = 0.0;
        return dst;
    },

    v3BuildZAxis : function v3BuildZAxisFn(dst) {
        if (!dst)
        {
            dst = [];
        }
        dst[0] = 0.0;
        dst[1] = 0.0;
        dst[2] = 1.0;
        return dst;
    },

    v3Build : function v3Fn(a, b, c, dst)
    {
        if (!dst)
        {
            dst = [];
        }
        dst[0] = a;
        dst[1] = b;
        dst[2] = c;
        return dst;
    },

    v3Copy : function v3CopyFn(src, dst)
    {
        if (!dst)
        {
            dst = [];
        }
        dst[0] = src[0];
        dst[1] = src[1];
        dst[2] = src[2];
        return dst;
    },

    v3Set : function v3SetFn(v, a)
    {
        v[0] = a[0];
        v[1] = a[1];
        v[2] = a[2];
    },

    v3Neg : function v3NegFn(a)
    {
        return [-a[0], -a[1], -a[2]];
    },

    v3Add : function v3AddFn(a, b)
    {
        return [(a[0] + b[0]), (a[1] + b[1]), (a[2] + b[2])];
    },

    v3Add3 : function v3Add3Fn(a, b, c)
    {
        return [(a[0] + b[0] + c[0]),
                (a[1] + b[1] + c[1]),
                (a[2] + b[2] + c[2])];
    },

    v3Add4 : function v3Add4Fn(a, b, c, d)
    {
        return [(a[0] + b[0] + c[0] + d[0]),
                (a[1] + b[1] + c[1] + d[1]),
                (a[2] + b[2] + c[2] + d[2])];
    },

    v3Sub : function v3SubFn(a, b)
    {
        return [(a[0] - b[0]), (a[1] - b[1]), (a[2] - b[2])];
    },

    v3Mul : function v3MulFn(a, b)
    {
        return [(a[0] * b[0]), (a[1] * b[1]), (a[2] * b[2])];
    },

    v3MulAdd : function v3MulAddFn(a, b, c)
    {
        return [((a[0] * b[0]) + c[0]), ((a[1] * b[1]) + c[1]), ((a[2] * b[2]) + c[2])];
    },

    v3Dot : function v3DotFn(a, b)
    {
        return ((a[0] * b[0]) + (a[1] * b[1]) + (a[2] * b[2]));
    },

    v3Cross : function v3CrossFn(a, b)
    {
        var a0 = a[0];
        var a1 = a[1];
        var a2 = a[2];
        var b0 = b[0];
        var b1 = b[1];
        var b2 = b[2];
        return [(a1 * b2) - (a2 * b1),
                (a2 * b0) - (a0 * b2),
                (a0 * b1) - (a1 * b0)];
    },

    v3LengthSq : function v3LengthSqFn(a)
    {
        var a0 = a[0];
        var a1 = a[1];
        var a2 = a[2];
        return ((a0 * a0) + (a1 * a1) + (a2 * a2));
    },

    v3Length : function v3LengthFn(a)
    {
        var a0 = a[0];
        var a1 = a[1];
        var a2 = a[2];
        return Math.sqrt((a0 * a0) + (a1 * a1) + (a2 * a2));
    },

    v3Reciprocal : function v3ReciprocalFn(a)
    {
        var rcp = VMath.reciprocal;
        return [rcp(a[0]), rcp(a[1]), rcp(a[2])];
    },

    v3Normalize : function v3NormalizeFn(a, dst)
    {
        var a0 = a[0];
        var a1 = a[1];
        var a2 = a[2];
        var lsq = ((a0 * a0) + (a1 * a1) + (a2 * a2));
        if (lsq > 0.0)
        {
            var lr = 1.0 / Math.sqrt(lsq);
            if (dst)
            {
                dst[0] = (a0 * lr);
                dst[1] = (a1 * lr);
                dst[2] = (a2 * lr);
                return dst;
            }
            else
            {
                return [(a0 * lr), (a1 * lr), (a2 * lr)];
            }
        }
        else
        {
            if (dst)
            {
                dst[0] = 0;
                dst[1] = 0;
                dst[2] = 0;
                return dst;
            }
            else
            {
                return [0, 0, 0];
            }
        }
    },

    v3Abs : function v3AbsFn(a)
    {
        var abs = Math.abs;
        return [abs(a[0]), abs(a[1]), abs(a[2])];
    },

    v3Max : function v3MaxFn(a, b)
    {
        var max = Math.max;
        return [max(a[0], b[0]), max(a[1], b[1]), max(a[2], b[2])];
    },

    v3Min : function v3MinFn(a, b)
    {
        var min = Math.min;
        return [min(a[0], b[0]), min(a[1], b[1]), min(a[2], b[2])];
    },

    v3Equal : function v3EqualFn(a, b)
    {
        var abs = Math.abs;
        var precision = VMath.precision;
        return (abs(a[0] - b[0]) <= precision &&
                abs(a[1] - b[1]) <= precision &&
                abs(a[2] - b[2]) <= precision);
    },

    // Vector3 'masks'
    v3MaskEqual : function v3MaskEqualFn(a, b)
    {
        var abs = Math.abs;
        var precision = VMath.precision;
        return [(abs(a[0] - b[0]) <= precision),
                (abs(a[1] - b[1]) <= precision),
                (abs(a[2] - b[2]) <= precision)];
    },

    v3MaskLess : function v3MaskLessFn(a, b)
    {
        return [(a[0] < b[0]),
                (a[1] < b[1]),
                (a[2] < b[2])];
    },

    v3MaskGreater : function v3MaskGreaterFn(a, b)
    {
        return [(a[0] > b[0]),
                (a[1] > b[1]),
                (a[2] > b[2])];
    },

    v3MaskGreaterEq : function v3MaskGreaterEqFn(a, b)
    {
        return [(a[0] >= b[0]),
                (a[1] >= b[1]),
                (a[2] >= b[2])];
    },

    v3MaskNot : function v3MaskNotFn(a)
    {
        return [!a[0],
                !a[1],
                !a[2]];
    },

    v3MaskOr : function v3MaskOrFn(a, b)
    {
        return [(a[0] || b[0]),
                (a[1] || b[1]),
                (a[2] || b[2])];
    },

    v3MaskAnd : function v3MaskAndFn(a, b)
    {
        return [(a[0] && b[0]),
                (a[1] && b[1]),
                (a[2] && b[2])];
    },

    v3Select : function v3SelectFn(m, a, b)
    {
        var select = VMath.select;
        return [select(m[0], a[0], b[0]),
                select(m[1], a[1], b[1]),
                select(m[2], a[2], b[2])];
    },

    // Vector3 operations with scalar
    v3ScalarBuild : function v3ScalarBuildFn(a)
    {
        return [a, a, a];
    },

    v3ScalarMax : function v3ScalarMaxFn(a, b)
    {
        var max = Math.max;
        return [max(a[0], b), max(a[1], b), max(a[2], b)];
    },

    v3ScalarMin : function v3ScalarMinFn(a, b)
    {
        var min = Math.min;
        return [min(a[0], b), min(a[1], b), min(a[2], b)];
    },

    v3ScalarAdd : function v3ScalarAddFn(a, b)
    {
        return [(a[0] + b), (a[1] + b), (a[2] + b)];
    },

    v3ScalarSub : function v3ScalarSubFn(a, b)
    {
        return [(a[0] - b), (a[1] - b), (a[2] - b)];
    },

    v3ScalarMul : function v3ScalarMulFn(a, b)
    {
        if (b === 0)
        {
            return [0, 0, 0];
        }
        else
        {
            return [(a[0] * b), (a[1] * b), (a[2] * b)];
        }
    },

    // Vector3 'masks' with scalars
    v3EqualScalarMask : function v3EqualScalarMaskFn(a, b)
    {
        var abs = Math.abs;
        var precision = VMath.precision;
        return [(abs(a[0] - b) <= precision),
                (abs(a[1] - b) <= precision),
                (abs(a[2] - b) <= precision)];
    },

    v3LessScalarMask : function v3LessScalarMaskFn(a, b)
    {
        return [(a[0] > b),
                (a[1] > b),
                (a[2] > b)];
    },

    v3GreaterScalarMask : function v3GreaterScalarMaskFn(a, b)
    {
        return [(a[0] > b),
                (a[1] > b),
                (a[2] > b)];
    },

    v3GreaterEqScalarMask : function v3GreaterEqScalarMaskFn(a, b)
    {
        return [(a[0] >= b),
                (a[1] >= b),
                (a[2] >= b)];
    },

    v3Lerp : function v3LerpFn(a, b, t, dst)
    {
        if (!dst)
        {
            dst = [];
        }

        dst[0] =  (a[0] + ((b[0] - a[0]) * t));
        dst[1] =  (a[1] + ((b[1] - a[1]) * t));
        dst[2] =  (a[2] + ((b[2] - a[2]) * t));

        return dst;
    },

    //
    // Vector4
    //
    v4BuildZero : function v4BuildZeroFn() {
        return [0.0, 0.0, 0.0, 0.0];
    },

    v4BuildOne  : function v4BuildOneFn() {
        return [1.0, 1.0, 1.0, 1.0];
    },

    v4Build : function v4BuildFn(a, b, c, d, dst)
    {
        if (!dst)
        {
            dst = [];
        }
        dst[0] = a;
        dst[1] = b;
        dst[2] = c;
        dst[3] = d;
        return dst;
    },

    v4Copy : function v4CopyFn(src, dst)
    {
        if (!dst)
        {
            dst = [];
        }
        dst[0] = src[0];
        dst[1] = src[1];
        dst[2] = src[2];
        dst[3] = src[3];
        return dst;
    },

    v4Set : function v4SetFn(v, a)
    {
        v[0] = a[0];
        v[1] = a[1];
        v[2] = a[2];
        v[3] = a[3];
    },

    v4Neg : function v4NegFn(a)
    {
        return [-a[0], -a[1], -a[2], -a[3]];
    },

    v4Add : function v4AddFn(a, b)
    {
        return [(a[0] + b[0]), (a[1] + b[1]), (a[2] + b[2]), (a[3] + b[3])];
    },

    v4Add3 : function v4Add3Fn(a, b, c)
    {
        return [(a[0] + b[0] + c[0]),
                (a[1] + b[1] + c[1]),
                (a[2] + b[2] + c[2]),
                (a[3] + b[3] + c[3])];
    },

    v4Add4 : function v4Add4Fn(a, b, c, d)
    {
        return [(a[0] + b[0] + c[0] + d[0]),
                (a[1] + b[1] + c[1] + d[1]),
                (a[2] + b[2] + c[2] + d[2]),
                (a[3] + b[3] + c[3] + d[3])];
    },

    v4Sub : function v4SubFn(a, b)
    {
        return [(a[0] - b[0]), (a[1] - b[1]), (a[2] - b[2]), (a[3] - b[3])];
    },

    v4Mul : function v4MulFn(a, b)
    {
        return [(a[0] * b[0]), (a[1] * b[1]), (a[2] * b[2]), (a[3] * b[3])];
    },

    v4MulAdd : function v4MulAddFn(a, b, c)
    {
        return [((a[0] * b[0]) + c[0]),
                ((a[1] * b[1]) + c[1]),
                ((a[2] * b[2]) + c[2]),
                ((a[3] * b[3]) + c[3])];
    },

    v4Dot : function v4DotFn(a, b)
    {
        return ((a[0] * b[0]) + (a[1] * b[1]) + (a[2] * b[2]) + (a[3] * b[3]));
    },

    v4LengthSq : function v4LengthSqFn(a)
    {
        var a0 = a[0];
        var a1 = a[1];
        var a2 = a[2];
        var a3 = a[3];
        return ((a0 * a0) + (a1 * a1) + (a2 * a2) + (a3 * a3));
    },

    v4Length : function v4LengthFn(a)
    {
        var a0 = a[0];
        var a1 = a[1];
        var a2 = a[2];
        var a3 = a[3];
        return Math.sqrt((a0 * a0) + (a1 * a1) + (a2 * a2) + (a3 * a3));
    },

    v4Reciprocal : function v4ReciprocalFn(a)
    {
        var rcp = VMath.reciprocal;
        return [rcp(a[0]), rcp(a[1]), rcp(a[2]), rcp(a[3])];
    },

    v4Normalize : function v4NormalizeFn(a)
    {
        var a0 = a[0];
        var a1 = a[1];
        var a2 = a[2];
        var a3 = a[3];
        var lsq = ((a0 * a0) + (a1 * a1) + (a2 * a2) + (a3 * a3));
        if (lsq > 0.0)
        {
            var lr = 1.0 / Math.sqrt(lsq);
            return [(a0 * lr), (a1 * lr), (a2 * lr), (a3 * lr)];
        }
        else
        {
            return [0, 0, 0, 0];
        }
    },

    v4Abs : function v4AbsFn(a)
    {
        var abs = Math.abs;
        return [abs(a[0]), abs(a[1]), abs(a[2]), abs(a[3])];
    },

    v4Max : function v4MaxFn(a, b)
    {
        var max = Math.max;
        return [max(a[0], b[0]), max(a[1], b[1]), max(a[2], b[2]), max(a[3], b[3])];
    },

    v4Min : function v4MinFn(a, b)
    {
        var min = Math.min;
        return [min(a[0], b[0]), min(a[1], b[1]), min(a[2], b[2]), min(a[3], b[3])];
    },

    v4Equal : function v4EqualFn(a, b)
    {
        var abs = Math.abs;
        var precision = VMath.precision;
        return (abs(a[0] - b[0]) <= precision &&
                abs(a[1] - b[1]) <= precision &&
                abs(a[2] - b[2]) <= precision &&
                abs(a[3] - b[3]) <= precision);
    },

    // Vector3 'masks'
    v4MaskEqual : function v4MaskEqualFn(a, b)
    {
        var abs = Math.abs;
        var precision = VMath.precision;
        return [(abs(a[0] - b[0]) <= precision),
                (abs(a[1] - b[1]) <= precision),
                (abs(a[2] - b[2]) <= precision),
                (abs(a[3] - b[3]) <= precision)];
    },

    v4MaskLess : function v4MaskLessFn(a, b)
    {
        return [(a[0] < b[0]),
                (a[1] < b[1]),
                (a[2] < b[2]),
                (a[3] < b[3])];
    },

    v4MaskGreater : function v4MaskGreaterFn(a, b)
    {
        return [(a[0] > b[0]),
                (a[1] > b[1]),
                (a[2] > b[2]),
                (a[3] > b[3])];
    },

    v4MaskGreaterEq : function v4MaskGreaterEqFn(a, b)
    {
        return [(a[0] >= b[0]),
                (a[1] >= b[1]),
                (a[2] >= b[2]),
                (a[3] >= b[3])];
    },

    v4MaskNot : function v4MaskNotFn(a)
    {
        return [!a[0],
                !a[1],
                !a[2],
                !a[3]];
    },

    v4MaskOr : function v4MaskOrFn(a, b)
    {
        return [(a[0] || b[0]),
                (a[1] || b[1]),
                (a[2] || b[2]),
                (a[3] || b[3])];
    },

    v4MaskAnd : function v4MaskAndFn(a, b)
    {
        return [(a[0] && b[0]),
                (a[1] && b[1]),
                (a[2] && b[2]),
                (a[3] && b[3])];
    },

    v4Many : function v4ManyFn(m)
    {
        return (m[0] || m[1] || m[2] || m[3]);
    },

    v4MaskAll : function v4MaskAllFn(m)
    {
        return (m[0] && m[1] && m[2] && m[3]);
    },

    v4Select : function v4SelectFn(m, a, b)
    {
        var select = VMath.select;
        return [select(m[0], a[0], b[0]),
                select(m[1], a[1], b[1]),
                select(m[2], a[2], b[2]),
                select(m[3], a[3], b[3])];
    },

    // Vector4 operations with scalar
    v4ScalarBuild : function v4ScalarBuildFn(a)
    {
        return [a, a, a, a];
    },

    v4ScalarMax : function v4ScalarMaxFn(a, b)
    {
        var max = Math.max;
        return [max(a[0], b), max(a[1], b), max(a[2], b), max(a[3], b)];
    },

    v4ScalarMin : function v4ScalarMinFn(a, b)
    {
        var min = Math.min;
        return [min(a[0], b), min(a[1], b), min(a[2], b), min(a[3], b)];
    },

    v4ScalarAdd : function v4ScalarAddFn(a, b)
    {
        return [(a[0] + b), (a[1] + b), (a[2] + b), (a[3] + b)];
    },

    v4ScalarSub : function v4ScalarSubFn(a, b)
    {
        return [(a[0] - b), (a[1] - b), (a[2] - b), (a[3] - b)];
    },

    v4ScalarMul : function v4ScalarMulFn(a, b)
    {
        if (b === 0)
        {
            return [0, 0, 0, 0];
        }
        else
        {
            return [(a[0] * b), (a[1] * b), (a[2] * b), (a[3] * b)];
        }
    },

    v4ScalarEqual : function v4ScalarEqualFn(a, b)
    {
        var abs = Math.abs;
        var precision = VMath.precision;
        return (abs(a[0] - b) <= precision &&
                abs(a[1] - b) <= precision &&
                abs(a[2] - b) <= precision &&
                abs(a[3] - b) <= precision);
    },

    // Vector3 'masks' with scalars
    v4EqualScalarMask : function v4EqualScalarMaskFn(a, b)
    {
        var abs = Math.abs;
        var precision = VMath.precision;
        return [(abs(a[0] - b) <= precision),
                (abs(a[1] - b) <= precision),
                (abs(a[2] - b) <= precision),
                (abs(a[3] - b) <= precision)];
    },

    v4LessScalarMask : function v4LessScalarMaskFn(a, b)
    {
        return [(a[0] < b),
                (a[1] < b),
                (a[2] < b),
                (a[3] < b)];
    },

    v4GreaterScalarMask : function v4GreaterScalarMaskFn(a, b)
    {
        return [(a[0] > b),
                (a[1] > b),
                (a[2] > b),
                (a[3] > b)];
    },

    v4GreaterEqScalarMask : function v4GreaterEqScalarMaskFn(a, b)
    {
        return [(a[0] >= b),
                (a[1] >= b),
                (a[2] >= b),
                (a[3] >= b)];
    },

    v4Lerp : function v4LerpFn(a, b, t)
    {
        return [(a[0] + ((b[0] - a[0]) * t)),
                (a[1] + ((b[1] - a[1]) * t)),
                (a[2] + ((b[2] - a[2]) * t)),
                (a[3] + ((b[3] - a[3]) * t))];
    },

    //
    // AABB
    //

    aabbBuild : function aabbBuildFn(a0, a1, a2, a3, a4, a5)
    {
        return [a0, a1, a2, a3, a4, a5];
    },

    aabbBuildEmpty : function aabbBuildEmptyFn()
    {
        var float_max = this.FLOAT_MAX;
        return [ float_max,  float_max,  float_max,
                -float_max, -float_max, -float_max];
    },

    aabbCopy : function aabbCopyFn(aabb)
    {
        return aabb.slice();
    },

    aabbSet : function aabbSet(dst, src)
    {
        dst[0] = src[0];
        dst[1] = src[1];
        dst[2] = src[2];
        dst[3] = src[3];
        dst[4] = src[4];
        dst[5] = src[5];
    },

    aabbIsEmpty : function aabbIsEmptyFn(aabb)
    {
        return aabb[0] > aabb[3];
    },

    aabbMin : function aabbMinFn(aabb)
    {
        return [aabb[0], aabb[1], aabb[2]];
    },

    aabbMax : function aabbMaxFn(aabb)
    {
        return [aabb[3], aabb[4], aabb[5]];
    },

    aabbGetCenterAndHalf : function aabbGetCenterAndHalfFn(aabb, center, half)
    {
        var cX = (aabb[0] + aabb[3]) * 0.5;
        var cY = (aabb[1] + aabb[4]) * 0.5;
        var cZ = (aabb[2] + aabb[5]) * 0.5;

        center[0] = cX;
        center[1] = cY;
        center[2] = cZ;

        half[0] = aabb[3] - cX;
        half[1] = aabb[4] - cY;
        half[2] = aabb[5] - cZ;
    },

    aabbIsInsidePlanes : function aabbIsInsidePlanesFn(aabb, planes)
    {
        var numPlanes = planes.length;
        var n = 0;
        do
        {
            var plane = planes[n];
            var d0 = plane[0];
            var d1 = plane[1];
            var d2 = plane[2];
            if ((d0 * (d0 < 0 ? aabb[0] : aabb[3]) + d1 * (d1 < 0 ? aabb[1] : aabb[4]) + d2 * (d2 < 0 ? aabb[2] : aabb[5])) < plane[3])
            {
                return false;
            }
            n += 1;
        }
        while (n < numPlanes);
        return true;
    },

    aabbIsFullyInsidePlanes : function aabbIsFullyInsidePlanesFn(aabb, planes)
    {
        var numPlanes = planes.length;
        var n = 0;
        do
        {
            var plane = planes[n];
            var d0 = plane[0];
            var d1 = plane[1];
            var d2 = plane[2];
            if ((d0 * (d0 > 0 ? aabb[0] : aabb[3]) + d1 * (d1 > 0 ? aabb[1] : aabb[4]) + d2 * (d2 > 0 ? aabb[2] : aabb[5])) < plane[3])
            {
                return false;
            }
            n += 1;
        }
        while (n < numPlanes);
        return true;
    },

    aabbUnion : function aabbUnionFn(a, b)
    {
        return [(a[0] < b[0] ? a[0] : b[0]),
                (a[1] < b[1] ? a[1] : b[1]),
                (a[2] < b[2] ? a[2] : b[2]),
                (a[3] > b[3] ? a[3] : b[3]),
                (a[4] > b[4] ? a[4] : b[4]),
                (a[5] > b[5] ? a[5] : b[5])];
    },

    aabbUnionArray : function aabbUnionArrayFn(aabbArray)
    {
        var union = aabbArray[0].slice();

        var numAABBs = aabbArray.length;
        for (var i = 0; i < numAABBs; i += 1)
        {
            union[0] = (union[0] < aabbArray[i][0] ? union[0] : aabbArray[i][0]);
            union[1] = (union[1] < aabbArray[i][1] ? union[1] : aabbArray[i][1]);
            union[2] = (union[2] < aabbArray[i][2] ? union[2] : aabbArray[i][2]);
            union[3] = (union[3] > aabbArray[i][3] ? union[3] : aabbArray[i][3]);
            union[4] = (union[4] > aabbArray[i][4] ? union[4] : aabbArray[i][4]);
            union[5] = (union[5] > aabbArray[i][5] ? union[5] : aabbArray[i][5]);
        }

        return union;
    },

    aabbAddPoints : function aabbAddPointFn(aabb, ps)
    {
        var i;
        var numPoints = ps.length;

        var r0 = aabb[0];
        var r1 = aabb[1];
        var r2 = aabb[2];
        var r3 = aabb[3];
        var r4 = aabb[4];
        var r5 = aabb[5];

        var p0, p1, p2;

        for (i = 0; i < numPoints; i += 1)
        {
            p0 = ps[i][0];
            p1 = ps[i][1];
            p2 = ps[i][2];

            r0 = (r0 < p0 ? r0 : p0);
            r1 = (r1 < p1 ? r1 : p1);
            r2 = (r2 < p2 ? r2 : p2);
            r3 = (r3 > p0 ? r3 : p0);
            r4 = (r4 > p1 ? r4 : p1);
            r5 = (r5 > p2 ? r5 : p2);
        }

        aabb[0] = r0;
        aabb[1] = r1;
        aabb[2] = r2;
        aabb[3] = r3;
        aabb[4] = r4;
        aabb[5] = r5;

    },

    aabbTransform : function aabbTransformFn(aabb, matrix)
    {
        var cX = (aabb[0] + aabb[3]) * 0.5;
        var cY = (aabb[1] + aabb[4]) * 0.5;
        var cZ = (aabb[2] + aabb[5]) * 0.5;

        var hX = aabb[3] - cX;
        var hY = aabb[4] - cY;
        var hZ = aabb[5] - cZ;

        var m0 = matrix[0];
        var m1 = matrix[1];
        var m2 = matrix[2];
        var m3 = matrix[3];
        var m4 = matrix[4];
        var m5 = matrix[5];
        var m6 = matrix[6];
        var m7 = matrix[7];
        var m8 = matrix[8];

        var ctX = matrix[9] +  (m0 * cX + m3 * cY + m6 * cZ);
        var ctY = matrix[10] + (m1 * cX + m4 * cY + m7 * cZ);
        var ctZ = matrix[11] + (m2 * cX + m5 * cY + m8 * cZ);

        var abs = Math.abs;

        var htX = (abs(m0) * hX + abs(m3) * hY + abs(m6) * hZ);
        var htY = (abs(m1) * hX + abs(m4) * hY + abs(m7) * hZ);
        var htZ = (abs(m2) * hX + abs(m5) * hY + abs(m8) * hZ);

        return [(ctX - htX),
                (ctY - htY),
                (ctZ - htZ),
                (ctX + htX),
                (ctY + htY),
                (ctZ + htZ)];

    },

    aabbIntercept : function aabbInterceptFn(a, b)
    {
        return [(a[0] > b[0] ? a[0] : b[0]),
                (a[1] > b[1] ? a[1] : b[1]),
                (a[2] > b[2] ? a[2] : b[2]),
                (a[3] < b[3] ? a[3] : b[3]),
                (a[4] < b[4] ? a[4] : b[4]),
                (a[5] < b[5] ? a[5] : b[5])];

    },

    aabbOverlaps : function aabbOverlapsFn(a, b)
    {
        return ((a[0] <= b[3]) &&
                (a[1] <= b[4]) &&
                (a[2] <= b[5]) &&
                (a[3] >= b[0]) &&
                (a[4] >= b[1]) &&
                (a[5] >= b[2]));
    },

    aabbSphereOverlaps : function aabbSphereOverlapsFn(aabb, center, radius)
    {
        var centerX = center[0];
        var centerY = center[1];
        var centerZ = center[2];
        var radiusSquared = radius * radius;

        var minX = aabb[0];
        var minY = aabb[1];
        var minZ = aabb[2];
        var maxX = aabb[3];
        var maxY = aabb[4];
        var maxZ = aabb[5];
        var totalDistance = 0, sideDistance;

        if (centerX < minX)
        {
            sideDistance = (minX - centerX);
            totalDistance += (sideDistance * sideDistance);
        }
        else if (centerX > maxX)
        {
            sideDistance = (centerX - maxX);
            totalDistance += (sideDistance * sideDistance);
        }
        if (centerY < minY)
        {
            sideDistance = (minY - centerY);
            totalDistance += (sideDistance * sideDistance);
        }
        else if (centerY > maxY)
        {
            sideDistance = (centerY - maxY);
            totalDistance += (sideDistance * sideDistance);
        }
        if (centerZ < minZ)
        {
            sideDistance = (minZ - centerZ);
            totalDistance += (sideDistance * sideDistance);
        }
        else if (centerZ > maxZ)
        {
            sideDistance = (centerZ - maxZ);
            totalDistance += (sideDistance * sideDistance);
        }
        return (totalDistance <= radiusSquared);
    },

    aabbIsInside : function aabbIsInsideFn(a, b)
    {
        return ((a[0] >= b[0]) &&
                (a[1] >= b[1]) &&
                (a[2] >= b[2]) &&
                (a[3] <= b[3]) &&
                (a[4] <= b[4]) &&
                (a[5] <= b[5]));
    },

    aabbTestInside : function aabbTestInsideFn(a, b)
    {
        if ((a[0] <= b[3]) &&
                (a[1] <= b[4]) &&
                (a[2] <= b[5]) &&
                (a[3] >= b[0]) &&
                (a[4] >= b[1]) &&
                (a[5] >= b[2]))
        {

            if ((a[0] >= b[0]) &&
                (a[1] >= b[1]) &&
                (a[2] >= b[2]) &&
                (a[3] <= b[3]) &&
                (a[4] <= b[4]) &&
                (a[5] <= b[5]))
            {
                return 2;
            }
            return 1;
        }

        return 0;
    },

    //
    // Matrix
    //
    m33BuildIdentity : function m33BuildIdentityFn() {
        return [1.0, 0.0, 0.0,
                0.0, 1.0, 0.0,
                0.0, 0.0, 1.0];
    },

    // Matrix33
    m33Build : function m33BuildFn(r, u, a)
    {
        if (arguments.length >= 9)
        {
            return [arguments[0], arguments[1], arguments[2],
                    arguments[3], arguments[4], arguments[5],
                    arguments[6], arguments[7], arguments[8]];
        }
        else
        {
            return [r[0], r[1], r[2],
                    u[0], u[1], u[2],
                    a[0], a[1], a[2]];
        }
    },

    m33Copy : function m33CopyFn(m)
    {
        return m.slice();
    },

    m33FromAxisRotation : function m33FromAxisRotationFn(axis, angle)
    {
        var s = Math.sin(angle);
        var c = Math.cos(angle);
        var t = 1.0 - c;
        var axisX = axis[0];
        var axisY = axis[1];
        var axisZ = axis[2];
        var tx = t * axisX;
        var ty = t * axisY;
        var tz = t * axisZ;
        var sx = s * axisX;
        var sy = s * axisY;
        var sz = s * axisZ;

        return [tx * axisX + c,
                tx * axisY - sz,
                tx * axisZ + sy,

                ty * axisX + sz,
                ty * axisY + c,
                ty * axisZ - sx,

                tz * axisX - sy,
                tz * axisY + sx,
                tz * axisZ + c];
    },

    m33FromQuat: function m33FromQuatFn(q)
    {
        var qx = q[0];
        var qy = q[1];
        var qz = q[2];
        var qw = q[3];

        var xx = 2.0 * qx * qx;
        var yy = 2.0 * qy * qy;
        var zz = 2.0 * qz * qz;
        var xy = 2.0 * qx * qy;
        var zw = 2.0 * qz * qw;
        var xz = 2.0 * qx * qz;
        var yw = 2.0 * qy * qw;
        var yz = 2.0 * qy * qz;
        var xw = 2.0 * qx * qw;

        return [1.0 - yy - zz, xy - zw, xz + yw,
                xy + zw, 1.0 - xx - zz, yz - xw,
                xz - yw, yz + xw, 1.0 - xx - yy];
    },

    m33Right : function m33RightFn(m)
    {
        return [m[0], m[1], m[2]];
    },

    m33Up : function m33UpFn(m)
    {
        return [m[3], m[4], m[5]];
    },

    m33At : function m33AtFn(m)
    {
        return [m[6], m[7], m[8]];
    },

    m33SetRight : function m33SetRightFn(m, v)
    {
        m[0] = v[0];
        m[1] = v[1];
        m[2] = v[2];
    },

    m33SetUp : function m33SetUpFn(m, v)
    {
        m[3] = v[0];
        m[4] = v[1];
        m[5] = v[2];
    },

    m33SetAt : function m33SetAtFn(m, v)
    {
        m[6] = v[0];
        m[7] = v[1];
        m[8] = v[2];
    },

    m33Transpose : function m33TransposeFn(m)
    {
        return [m[0], m[3], m[6],
                m[1], m[4], m[7],
                m[2], m[5], m[8]];
    },

    m33Determinant : function m33DeterminantFn(m)
    {
        var m0 = m[0];
        var m1 = m[1];
        var m2 = m[2];
        var m3 = m[3];
        var m4 = m[4];
        var m5 = m[5];
        var m6 = m[6];
        var m7 = m[7];
        var m8 = m[8];
        return (m0 * (m4 * m8 - m5 * m7) +
                m1 * (m5 * m6 - m3 * m8) +
                m2 * (m3 * m7 - m4 * m6));
    },

    m33Inverse : function m33InverseFn(m)
    {
        var det = VMath.m33Determinant(m);
        if (det === 0.0)
        {
            return [];
        }
        else
        {
            var detrecp = 1.0 / det;
            return [((m[4] * m[8] + m[5] * (-m[7])) * detrecp),
                    ((m[7] * m[2] + m[8] * (-m[1])) * detrecp),
                    ((m[1] * m[5] - m[2] *   m[4])  * detrecp),
                    ((m[5] * m[6] + m[3] * (-m[8])) * detrecp),
                    ((m[8] * m[0] + m[6] * (-m[2])) * detrecp),
                    ((m[3] * m[2] - m[0] *   m[5])  * detrecp),
                    ((m[3] * m[7] + m[4] * (-m[6])) * detrecp),
                    ((m[6] * m[1] + m[7] * (-m[0])) * detrecp),
                    ((m[0] * m[4] - m[3] *   m[1])  * detrecp)];
        }
    },

    m33InverseTranspose : function m33InverseTransposeFn(m)
    {
        var m0 = m[0];
        var m1 = m[1];
        var m2 = m[2];
        var m3 = m[3];
        var m4 = m[4];
        var m5 = m[5];
        var m6 = m[6];
        var m7 = m[7];
        var m8 = m[8];
        var det = (m0 * (m4 * m8 - m5 * m7) +
                   m1 * (m5 * m6 - m3 * m8) +
                   m2 * (m3 * m7 - m4 * m6));
        if (det === 0.0)
        {
            return [];
        }
        else
        {
            var detrecp = 1.0 / det;
            var r0 = ((m4 * m8 + m5 * (-m7)) * detrecp);
            var r1 = ((m7 * m2 + m8 * (-m1)) * detrecp);
            var r2 = ((m1 * m5 - m2 *   m4)  * detrecp);
            var r3 = ((m5 * m6 + m3 * (-m8)) * detrecp);
            var r4 = ((m8 * m0 + m6 * (-m2)) * detrecp);
            var r5 = ((m3 * m2 - m0 *   m5)  * detrecp);
            var r6 = ((m3 * m7 + m4 * (-m6)) * detrecp);
            var r7 = ((m6 * m1 + m7 * (-m0)) * detrecp);
            var r8 = ((m0 * m4 - m3 *   m1)  * detrecp);
            return [r0, r3, r6,
                    r1, r4, r7,
                    r2, r5, r8];
        }
    },

    m33Mul : function m33MulFn(a, b)
    {
        var a0  = a[0];
        var a1  = a[1];
        var a2  = a[2];
        var a3  = a[3];
        var a4  = a[4];
        var a5  = a[5];
        var a6  = a[6];
        var a7  = a[7];
        var a8  = a[8];

        var b0  = b[0];
        var b1  = b[1];
        var b2  = b[2];
        var b3  = b[3];
        var b4  = b[4];
        var b5  = b[5];
        var b6  = b[6];
        var b7  = b[7];
        var b8  = b[8];

        return [
            (b0 * a0 + b3 * a1 + b6 * a2),
            (b1 * a0 + b4 * a1 + b7 * a2),
            (b2 * a0 + b5 * a1 + b8 * a2),

            (b0 * a3 + b3 * a4 + b6 * a5),
            (b1 * a3 + b4 * a4 + b7 * a5),
            (b2 * a3 + b5 * a4 + b8 * a5),

            (b0 * a6 + b3 * a7 + b6 * a8),
            (b1 * a6 + b4 * a7 + b7 * a8),
            (b2 * a6 + b5 * a7 + b8 * a8)
        ];
    },

    m33Transform : function m33TransformFn(m, v)
    {
        var v3ms = VMath.v3ScalarMul;
        return VMath.v3Add3(v3ms(VMath.m33Right(m), v[0]),
                            v3ms(VMath.m33Up(m),    v[1]),
                            v3ms(VMath.m33At(m),    v[2]));
    },

    m33Equal : function m33EqualFn(a, b)
    {
        var abs = Math.abs;
        var precision = VMath.precision;
        return (abs(a[0] - b[0]) <= precision &&
                abs(a[1] - b[1]) <= precision &&
                abs(a[2] - b[2]) <= precision &&
                abs(a[3] - b[3]) <= precision &&
                abs(a[4] - b[4]) <= precision &&
                abs(a[5] - b[5]) <= precision &&
                abs(a[6] - b[6]) <= precision &&
                abs(a[7] - b[7]) <= precision &&
                abs(a[8] - b[8]) <= precision);
    },

    m33MulM43 : function m33MulM43Fn(a, b)
    {
        var a0  = a[0];
        var a1  = a[1];
        var a2  = a[2];
        var a3  = a[3];
        var a4  = a[4];
        var a5  = a[5];
        var a6  = a[6];
        var a7  = a[7];
        var a8  = a[8];

        var b0  = b[0];
        var b1  = b[1];
        var b2  = b[2];
        var b3  = b[3];
        var b4  = b[4];
        var b5  = b[5];
        var b6  = b[6];
        var b7  = b[7];
        var b8  = b[8];

        return [
            (b0 * a0 + b3 * a1 + b6 * a2),
            (b1 * a0 + b4 * a1 + b7 * a2),
            (b2 * a0 + b5 * a1 + b8 * a2),

            (b0 * a3 + b3 * a4 + b6 * a5),
            (b1 * a3 + b4 * a4 + b7 * a5),
            (b2 * a3 + b5 * a4 + b8 * a5),

            (b0 * a6 + b3 * a7 + b6 * a8),
            (b1 * a6 + b4 * a7 + b7 * a8),
            (b2 * a6 + b5 * a7 + b8 * a8),

            b[9], b[10], b[11]
        ];
    },

    m33MulM44 : function m33MulM44Fn(a, b)
    {
        var a0  = a[0];
        var a1  = a[1];
        var a2  = a[2];
        var a3  = a[3];
        var a4  = a[4];
        var a5  = a[5];
        var a6  = a[6];
        var a7  = a[7];
        var a8  = a[8];

        var b0  = b[0];
        var b1  = b[1];
        var b2  = b[2];
        var b3  = b[3];
        var b4  = b[4];
        var b5  = b[5];
        var b6  = b[6];
        var b7  = b[7];
        var b8  = b[8];
        var b9  = b[9];
        var b10 = b[10];
        var b11 = b[11];

        return [
                (b0 * a0 + b4 * a1 + b8  * a2),
                (b1 * a0 + b5 * a1 + b9  * a2),
                (b2 * a0 + b6 * a1 + b10 * a2),
                (b3 * a0 + b7 * a1 + b11 * a2),

                (b0 * a3 + b4 * a4 + b8  * a5),
                (b1 * a3 + b5 * a4 + b9  * a5),
                (b2 * a3 + b6 * a4 + b10 * a5),
                (b3 * a3 + b7 * a4 + b11 * a5),

                (b0 * a6 + b4 * a7 + b8  * a8),
                (b1 * a6 + b5 * a7 + b9  * a8),
                (b2 * a6 + b6 * a7 + b10 * a8),
                (b3 * a6 + b7 * a7 + b11 * a8),

                b[12], b[13], b[14], b[15]
            ];
    },

    // Matrix3 operations with scalar
    m33ScalarAdd : function m33ScalarAddFn(m, s)
    {
        var r = [];
        for (var n = 0; n < 9; n += 1)
        {
            r[n] = (m[n] + s);
        }
        return r;
    },

    m33ScalarSub : function m33ScalarSubFn(m, s)
    {
        var r = [];
        for (var n = 0; n < 9; n += 1)
        {
            r[n] = (m[n] - s);
        }
        return r;
    },

    m33ScalarMul : function m33ScalarMulFn(m, s)
    {
        var r = [];
        for (var n = 0; n < 9; n += 1)
        {
            r[n] = (m[n] * s);
        }
        return r;
    },

    // Matrix34
    m34BuildIdentity : function m34BuildIdentityFn()
    {
        return [1.0, 0.0, 0.0, 0.0,
                0.0, 1.0, 0.0, 0.0,
                0.0, 0.0, 1.0, 0.0];
    },

    m34Pos : function m34PosFn(m)
    {
        return [m[3], m[7], m[11]];
    },

    m34Scale : function m34ScaleFn(m, scale)
    {
        m[0] *= scale[0];
        m[1] *= scale[0];
        m[2] *= scale[0];

        m[4] *= scale[1];
        m[5] *= scale[1];
        m[6] *= scale[1];

        m[8] *= scale[2];
        m[9] *= scale[2];
        m[10] *= scale[2];
    },

    // Matrix43
    m43BuildIdentity : function m43BuildIdentityFn() {
        return [1.0, 0.0, 0.0,
                0.0, 1.0, 0.0,
                0.0, 0.0, 1.0,
                0.0, 0.0, 0.0];
    },

    m43Build : function m43BuildFn(r, u, a, p, dst)
    {
        var res = [];
        var length = arguments.length;

        if (arguments.length >= 12)
        {
            if (length === 13)
            {
                res = arguments[12];
            }

            res[0] = arguments[0];
            res[1] = arguments[1];
            res[2] = arguments[2];
            res[3] = arguments[3];
            res[4] = arguments[4];
            res[5] = arguments[5];
            res[6] = arguments[6];
            res[7] = arguments[7];
            res[8] = arguments[8];
            res[9] = arguments[9];
            res[10] = arguments[10];
            res[11] = arguments[11];

            return res;
        }
        else
        {
            if (length === 5)
            {
                res = dst;
            }

            res[0] = r[0];
            res[1] = r[1];
            res[2] = r[2];
            res[3] = u[0];
            res[4] = u[1];
            res[5] = u[2];
            res[6] = a[0];
            res[7] = a[1];
            res[8] = a[2];
            res[9] = p[0];
            res[10] = p[1];
            res[11] = p[2];

            return res;
        }
    },

    m43BuildTranslation : function m43BuildTranslationFn(p, dst)
    {
        var res = [];
        var length = arguments.length;

        if (length >= 3)
        {
            if (length === 4)
            {
                res = arguments[3];
            }

            res[0] = 1;
            res[1] = 0;
            res[2] = 0;
            res[3] = 0;
            res[4] = 1;
            res[5] = 0;
            res[6] = 0;
            res[7] = 0;
            res[8] = 1;
            res[9] = arguments[0];
            res[10] = arguments[1];
            res[11] = arguments[2];

            return res;
        }
        else
        {
            if (length === 2)
            {
                res = dst;
            }

            res[0] = 1;
            res[1] = 0;
            res[2] = 0;
            res[3] = 0;
            res[4] = 1;
            res[5] = 0;
            res[6] = 0;
            res[7] = 0;
            res[8] = 1;
            res[9] = p[0];
            res[10] = p[1];
            res[11] = p[2];

            return res;
        }
    },

    m43Copy : function m43CopyFn(m, dst)
    {
        if (dst)
        {
            dst[0] = m[0];
            dst[1] = m[1];
            dst[2] = m[2];
            dst[3] = m[3];
            dst[4] = m[4];
            dst[5] = m[5];
            dst[6] = m[6];
            dst[7] = m[7];
            dst[8] = m[8];
            dst[9] = m[9];
            dst[10] = m[10];
            dst[11] = m[11];
            return dst;
        }
        else
        {
            return m.slice();
        }
    },

    m43FromM33V3: function m43FromM33V3Fn(m, v)
    {
        return [m[0], m[1], m[2],
                m[3], m[4], m[5],
                m[6], m[7], m[8],
                v[0], v[1], v[2]];
    },

    m43FromAxisRotation : function m43FromAxisRotationFn(axis, angle, dst)
    {
        var s = Math.sin(angle);
        var c = Math.cos(angle);
        var t = 1.0 - c;
        var axisX = axis[0];
        var axisY = axis[1];
        var axisZ = axis[2];
        var tx = t * axisX;
        var ty = t * axisY;
        var tz = t * axisZ;
        var sx = s * axisX;
        var sy = s * axisY;
        var sz = s * axisZ;

        if (!dst)
        {
            dst = [];
        }

        dst[0] = tx * axisX + c;
        dst[1] = tx * axisY - sz;
        dst[2] = tx * axisZ + sy;

        dst[3] = ty * axisX + sz;
        dst[4] = ty * axisY + c;
        dst[5] = ty * axisZ - sx;

        dst[6] = tz * axisX - sy;
        dst[7] = tz * axisY + sx;
        dst[8] = tz * axisZ + c;

        dst[9] = 0.0;
        dst[10] = 0.0;
        dst[11] = 0.0;

        return dst;
    },

    m43FromQuatPos : function m43FromQuatPosFn(qp)
    {
        var qx = qp[0];
        var qy = qp[1];
        var qz = qp[2];
        var qw = qp[3];
        var px = qp[4];
        var py = qp[5];
        var pz = qp[6];

        var xx = 2.0 * qx * qx;
        var yy = 2.0 * qy * qy;
        var zz = 2.0 * qz * qz;
        var xy = 2.0 * qx * qy;
        var zw = 2.0 * qz * qw;
        var xz = 2.0 * qx * qz;
        var yw = 2.0 * qy * qw;
        var yz = 2.0 * qy * qz;
        var xw = 2.0 * qx * qw;

        return [1.0 - yy - zz, xy - zw, xz + yw,
                xy + zw, 1.0 - xx - zz, yz - xw,
                xz - yw, yz + xw, 1.0 - xx - yy,
                px, py, pz];
    },

    m43FromRTS : function m43FromRTSFn(quat, pos, scale, dst)
    {
        var qx = quat[0];
        var qy = quat[1];
        var qz = quat[2];
        var qw = quat[3];

        var xx = (2.0 * qx * qx);
        var yy = (2.0 * qy * qy);
        var zz = (2.0 * qz * qz);
        var xy = (2.0 * qx * qy);
        var zw = (2.0 * qz * qw);
        var xz = (2.0 * qx * qz);
        var yw = (2.0 * qy * qw);
        var yz = (2.0 * qy * qz);
        var xw = (2.0 * qx * qw);

        var sx = scale[0];
        var sy = scale[1];
        var sz = scale[2];

        if (!dst)
        {
            dst = [];
        }

        dst[0] = sx * (1.0 - yy - zz);
        dst[1] = sx * (xy - zw);
        dst[2] = sx * (xz + yw);
        dst[3] = sy * (xy + zw);
        dst[4] = sy * (1.0 - xx - zz);
        dst[5] = sy * (yz - xw);
        dst[6] = sz * (xz - yw);
        dst[7] = sz * (yz + xw);
        dst[8] = sz * (1.0 - xx - yy);
        dst[9]  = pos[0];
        dst[10] = pos[1];
        dst[11] = pos[2];

        return dst;
    },

    m43FromRT : function m43FromRTFn(quat, pos, dst)
    {
        var qx = quat[0];
        var qy = quat[1];
        var qz = quat[2];
        var qw = quat[3];

        var xx = (2.0 * qx * qx);
        var yy = (2.0 * qy * qy);
        var zz = (2.0 * qz * qz);
        var xy = (2.0 * qx * qy);
        var zw = (2.0 * qz * qw);
        var xz = (2.0 * qx * qz);
        var yw = (2.0 * qy * qw);
        var yz = (2.0 * qy * qz);
        var xw = (2.0 * qx * qw);

        if (!dst)
        {
            dst = [];
        }

        dst[0] =  1.0 - yy - zz;
        dst[1] =  xy - zw;
        dst[2] =  xz + yw;
        dst[3] =  xy + zw;
        dst[4] =  1.0 - xx - zz;
        dst[5] =  yz - xw;
        dst[6] =  xz - yw;
        dst[7] =  yz + xw;
        dst[8] =  1.0 - xx - yy;
        dst[9]  = pos[0];
        dst[10] = pos[1];
        dst[11] = pos[2];

        return dst;
    },

    m43Right : function m43RightFn(m)
    {
        return [m[0], m[1], m[2]];
    },

    m43Up : function m43UpFn(m)
    {
        return [m[3], m[4], m[5]];
    },

    m43At : function m43AtFn(m)
    {
        return [m[6], m[7], m[8]];
    },

    m43Pos : function m43PosFn(m)
    {
        return [m[9], m[10], m[11]];
    },

    m43SetRight : function m43SetRightFn(m, v)
    {
        m[0] = v[0];
        m[1] = v[1];
        m[2] = v[2];
    },

    m43SetUp : function m43SetUpFn(m, v)
    {
        m[3] = v[0];
        m[4] = v[1];
        m[5] = v[2];
    },

    m43SetAt : function m43SetAtFn(m, v)
    {
        m[6] = v[0];
        m[7] = v[1];
        m[8] = v[2];
    },

    m43SetPos : function m43SetPosFn(m, v)
    {
        m[9] = v[0];
        m[10] = v[1];
        m[11] = v[2];
    },

    m43SetAxisRotation : function m43SetAxisRotationFn(m, axis, angle)
    {
        var s = Math.sin(angle);
        var c = Math.cos(angle);
        var t = 1.0 - c;
        var axisX = axis[0];
        var axisY = axis[1];
        var axisZ = axis[2];
        var tx = t * axisX;
        var ty = t * axisY;
        var tz = t * axisZ;
        var sx = s * axisX;
        var sy = s * axisY;
        var sz = s * axisZ;
        m[0] = tx * axisX + c;
        m[1] = tx * axisY - sz;
        m[2] = tx * axisZ + sy;
        m[3] = ty * axisX + sz;
        m[4] = ty * axisY + c;
        m[5] = ty * axisZ - sx;
        m[6] = tz * axisX - sy;
        m[7] = tz * axisY + sx;
        m[8] = tz * axisZ + c;
    },

    m43InverseOrthonormal : function m43InverseOrthonormalFn(m)
    {
        var m0 = m[0];
        var m1 = m[1];
        var m2 = m[2];
        var m3 = m[3];
        var m4 = m[4];
        var m5 = m[5];
        var m6 = m[6];
        var m7 = m[7];
        var m8 = m[8];
        var px = m[9];
        var py = m[10];
        var pz = m[11];
        return [m0, m3, m6,
                m1, m4, m7,
                m2, m5, m8,
                -((px * m0) + (py * m1) + (pz * m2)),
                -((px * m3) + (py * m4) + (pz * m5)),
                -((px * m6) + (py * m7) + (pz * m8))];
    },

    m43Orthonormalize : function m43OrthonormalizeFn(m)
    {
        var normalize = VMath.v3Normalize;
        var length    = VMath.v3Length;
        var dot       = VMath.v3Dot;
        var cross     = VMath.v3Cross;
        var abs       = Math.abs;

        var right = VMath.m43Right(m);
        var up    = VMath.m43Up(m);
        var at    = VMath.m43At(m);
        var pos   = VMath.m43Pos(m);

        var innerX = length(right);
        var innerY = length(up);
        var innerZ = length(at);

        right = normalize(right);
        up    = normalize(up);
        at    = normalize(at);

        var vpU, vpV, vpW;
        if (innerX > 0.0)
        {
            if (innerY > 0.0)
            {
                if (innerZ > 0.0)
                {
                    var outerX = abs(dot(up, at));
                    var outerY = abs(dot(at, right));
                    var outerZ = abs(dot(right, up));
                    if (outerX < outerY)
                    {
                        if (outerX < outerZ)
                        {
                            vpU = up;
                            vpV = at;
                            vpW = right;
                        }
                        else
                        {
                            vpU = right;
                            vpV = up;
                            vpW = at;
                        }
                    }
                    else
                    {
                        if (outerY < outerZ)
                        {
                            vpU = at;
                            vpV = right;
                            vpW = up;
                        }
                        else
                        {
                            vpU = right;
                            vpV = up;
                            vpW = at;
                        }
                    }
                }
                else
                {
                    vpU = right;
                    vpV = up;
                    vpW = at;
                }
            }
            else
            {
                vpU = at;
                vpV = right;
                vpW = up;
            }
        }
        else
        {
            vpU = up;
            vpV = at;
            vpW = right;
        }
        VMath.v3Set(vpW, normalize(cross(vpV, vpU)));
        VMath.v3Set(vpV, normalize(cross(vpU, vpW)));
        return VMath.m43Build(right,
                               up,
                               at,
                               pos);
    },

    m43Determinant : function m43DeterminantFn(m)
    {
        return (m[0] * (m[4] * m[8] - m[5] * m[7]) +
                m[1] * (m[5] * m[6] - m[3] * m[8]) +
                m[2] * (m[3] * m[7] - m[4] * m[6]));
    },

    m43Inverse : function m43InverseFn(m)
    {
        var det = VMath.m43Determinant(m);
        if (det === 0.0)
        {
            return [];
        }
        else
        {
            var detrecp = 1.0 / det;
            return [((m[4] * m[8] + m[5] * (-m[7])) * detrecp),
                    ((m[7] * m[2] + m[8] * (-m[1])) * detrecp),
                    ((m[1] * m[5] - m[2] *   m[4])  * detrecp),
                    ((m[5] * m[6] + m[3] * (-m[8])) * detrecp),
                    ((m[8] * m[0] + m[6] * (-m[2])) * detrecp),
                    ((m[3] * m[2] - m[0] *   m[5])  * detrecp),
                    ((m[3] * m[7] + m[4] * (-m[6])) * detrecp),
                    ((m[6] * m[1] + m[7] * (-m[0])) * detrecp),
                    ((m[0] * m[4] - m[3] *   m[1])  * detrecp),
                    ((m[3] * (m[10] * m[8]  - m[7] * m[11]) + m[4]  * (m[6] * m[11] - m[9] * m[8]) + m[5]  * (m[9] * m[7] - m[6] * m[10])) * detrecp),
                    ((m[6] * (m[2]  * m[10] - m[1] * m[11]) + m[7]  * (m[0] * m[11] - m[9] * m[2]) + m[8]  * (m[9] * m[1] - m[0] * m[10])) * detrecp),
                    ((m[9] * (m[2]  * m[4]  - m[1] * m[5])  + m[10] * (m[0] * m[5]  - m[3] * m[2]) + m[11] * (m[3] * m[1] - m[0] * m[4]))  * detrecp)];
        }
    },

    m43Translate : function m43TranslateFn(matrix, pos)
    {
        matrix[9]  += pos[0];
        matrix[10] += pos[1];
        matrix[11] += pos[2];
    },

    m43Scale : function m43ScaleFn(m, scale, dst)
    {
        if (!dst)
        {
            dst = [];
        }

        dst[0] = m[0] * scale[0];
        dst[1] = m[1] * scale[0];
        dst[2] = m[2] * scale[0];
        dst[3] = m[3] * scale[1];
        dst[4] = m[4] * scale[1];
        dst[5] = m[5] * scale[1];
        dst[6] = m[6] * scale[2];
        dst[7] = m[7] * scale[2];
        dst[8] = m[8] * scale[2];
        dst[9] = m[9];
        dst[10] = m[10];
        dst[11] = m[11];

        return dst;
    },

    m43TransformVector : function m43TransformVectorFn(m, v)
    {
        var v0 = v[0];
        var v1 = v[1];
        var v2 = v[2];
        return [
                (m[0] * v0 + m[3] * v1 + m[6] * v2),
                (m[1] * v0 + m[4] * v1 + m[7] * v2),
                (m[2] * v0 + m[5] * v1 + m[8] * v2)
            ];
    },

    m43TransformPoint : function m43TransformPointFn(m, v)
    {
        var v0 = v[0];
        var v1 = v[1];
        var v2 = v[2];
        return [
                (m[0] * v0 + m[3] * v1 + m[6] * v2 + m[9]),
                (m[1] * v0 + m[4] * v1 + m[7] * v2 + m[10]),
                (m[2] * v0 + m[5] * v1 + m[8] * v2 + m[11])
            ];
    },

    m43Mul : function m43MulFn(a, b, dst)
    {
        var a0  = a[0];
        var a1  = a[1];
        var a2  = a[2];
        var a3  = a[3];
        var a4  = a[4];
        var a5  = a[5];
        var a6  = a[6];
        var a7  = a[7];
        var a8  = a[8];
        var a9  = a[9];
        var a10 = a[10];
        var a11 = a[11];

        var b0  = b[0];
        var b1  = b[1];
        var b2  = b[2];
        var b3  = b[3];
        var b4  = b[4];
        var b5  = b[5];
        var b6  = b[6];
        var b7  = b[7];
        var b8  = b[8];

        if (!dst)
        {
            dst = [];
        }

        dst[0] =  (b0 * a0 + b3 * a1 + b6 * a2);
        dst[1] =  (b1 * a0 + b4 * a1 + b7 * a2);
        dst[2] =  (b2 * a0 + b5 * a1 + b8 * a2);
        dst[3] =  (b0 * a3 + b3 * a4 + b6 * a5);
        dst[4] =  (b1 * a3 + b4 * a4 + b7 * a5);
        dst[5] =  (b2 * a3 + b5 * a4 + b8 * a5);
        dst[6] =  (b0 * a6 + b3 * a7 + b6 * a8);
        dst[7] =  (b1 * a6 + b4 * a7 + b7 * a8);
        dst[8] =  (b2 * a6 + b5 * a7 + b8 * a8);
        dst[9]  = (b0 * a9 + b3 * a10 + b6 * a11 + b[9]);
        dst[10] = (b1 * a9 + b4 * a10 + b7 * a11 + b[10]);
        dst[11] = (b2 * a9 + b5 * a10 + b8 * a11 + b[11]);

        return dst;
    },

    m43MulM44 : function m43MulM44Fn(a, b, dst)
    {
        var a0  = a[0];
        var a1  = a[1];
        var a2  = a[2];
        var a3  = a[3];
        var a4  = a[4];
        var a5  = a[5];
        var a6  = a[6];
        var a7  = a[7];
        var a8  = a[8];
        var a9  = a[9];
        var a10 = a[10];
        var a11 = a[11];

        var b0  = b[0];
        var b1  = b[1];
        var b2  = b[2];
        var b3  = b[3];
        var b4  = b[4];
        var b5  = b[5];
        var b6  = b[6];
        var b7  = b[7];
        var b8  = b[8];
        var b9  = b[9];
        var b10 = b[10];
        var b11 = b[11];

        if (!dst)
        {
            dst = [];
        }

        dst[0] =  (b0 * a0 + b4 * a1 + b8  * a2);
        dst[1] =  (b1 * a0 + b5 * a1 + b9  * a2);
        dst[2] =  (b2 * a0 + b6 * a1 + b10 * a2);
        dst[3] =  (b3 * a0 + b7 * a1 + b11 * a2);
        dst[4] =  (b0 * a3 + b4 * a4 + b8  * a5);
        dst[5] =  (b1 * a3 + b5 * a4 + b9  * a5);
        dst[6] =  (b2 * a3 + b6 * a4 + b10 * a5);
        dst[7] =  (b3 * a3 + b7 * a4 + b11 * a5);
        dst[8] =  (b0 * a6 + b4 * a7 + b8  * a8);
        dst[9]  = (b1 * a6 + b5 * a7 + b9  * a8);
        dst[10] = (b2 * a6 + b6 * a7 + b10 * a8);
        dst[11] = (b3 * a6 + b7 * a7 + b11 * a8);
        dst[12] = (b0 * a9 + b4 * a10 + b8  * a11 + b[12]);
        dst[13] = (b1 * a9 + b5 * a10 + b9  * a11 + b[13]);
        dst[14] = (b2 * a9 + b6 * a10 + b10 * a11 + b[14]);
        dst[15] = (b3 * a9 + b7 * a10 + b11 * a11 + b[15]);

        return dst;
    },

    m43Transpose : function m43TransposeFn(m)
    {
        return [m[0], m[3], m[6], m[9],
                m[1], m[4], m[7], m[10],
                m[2], m[5], m[8], m[11]];
    },

    m43MulTranspose: function m43MulTransposeFn(a, b, dst)
    {
        var a0 = a[0];
        var a1 = a[1];
        var a2 = a[2];
        var a3 = a[3];
        var a4 = a[4];
        var a5 = a[5];
        var a6 = a[6];
        var a7 = a[7];
        var a8 = a[8];
        var a9 = a[9];
        var a10 = a[10];
        var a11 = a[11];

        var b0 = b[0];
        var b1 = b[1];
        var b2 = b[2];
        var b3 = b[3];
        var b4 = b[4];
        var b5 = b[5];
        var b6 = b[6];
        var b7 = b[7];
        var b8 = b[8];

        if (!dst)
        {
            dst = [];
        }

        dst[0] =  (b0 * a0 + b3 * a1 + b6 * a2);
        dst[1] =  (b0 * a3 + b3 * a4 + b6 * a5);
        dst[2] =  (b0 * a6 + b3 * a7 + b6 * a8);
        dst[3] =  (b0 * a9 + b3 * a10 + b6 * a11 + b[9]);
        dst[4] =  (b1 * a0 + b4 * a1 + b7 * a2);
        dst[5] =  (b1 * a3 + b4 * a4 + b7 * a5);
        dst[6] =  (b1 * a6 + b4 * a7 + b7 * a8);
        dst[7] =  (b1 * a9 + b4 * a10 + b7 * a11 + b[10]);
        dst[8] =  (b2 * a0 + b5 * a1 + b8 * a2);
        dst[9]  = (b2 * a3 + b5 * a4 + b8 * a5);
        dst[10] = (b2 * a6 + b5 * a7 + b8 * a8);
        dst[11] = (b2 * a9 + b5 * a10 + b8 * a11 + b[11]);

        return dst;
    },

    m43Offset: function m43OffsetFn(m, o)
    {
        var m0 = m[0];
        var m1 = m[1];
        var m2 = m[2];
        var m3 = m[3];
        var m4 = m[4];
        var m5 = m[5];
        var m6 = m[6];
        var m7 = m[7];
        var m8 = m[8];
        var m9 = m[9];
        var m10 = m[10];
        var m11 = m[11];

        var o0 = o[0];
        var o1 = o[1];
        var o2 = o[2];

        return [m0, m1, m2, m3, m4, m5, m6, m7, m8,
                (m0 * o0 + m3 * o1 + m6 * o2 + m9),
                (m1 * o0 + m4 * o1 + m7 * o2 + m10),
                (m2 * o0 + m5 * o1 + m8 * o2 + m11)];
    },

    m43NegOffset: function m43NegOffsetFn(m, o)
    {
        var m0 = m[0];
        var m1 = m[1];
        var m2 = m[2];
        var m3 = m[3];
        var m4 = m[4];
        var m5 = m[5];
        var m6 = m[6];
        var m7 = m[7];
        var m8 = m[8];
        var m9 = m[9];
        var m10 = m[10];
        var m11 = m[11];

        var o0 = -o[0];
        var o1 = -o[1];
        var o2 = -o[2];

        return [m0, m1, m2, m3, m4, m5, m6, m7, m8,
                (m0 * o0 + m3 * o1 + m6 * o2 + m9),
                (m1 * o0 + m4 * o1 + m7 * o2 + m10),
                (m2 * o0 + m5 * o1 + m8 * o2 + m11)];
    },

    m43InverseTransposeProjection: function m43InverseTransposeProjectionFn(m, s)
    {
        var xf = (0.5 / s[0]);
        var yf = (0.5 / s[1]);
        var zf = (0.5 / s[2]);
        var m0 = (m[0] * xf);
        var m1 = (m[1] * xf);
        var m2 = (m[2] * xf);
        var m3 = (m[3] * yf);
        var m4 = (m[4] * yf);
        var m5 = (m[5] * yf);
        var m6 = (m[6] * zf);
        var m7 = (m[7] * zf);
        var m8 = (m[8] * zf);
        var px = m[9];
        var py = m[10];
        var pz = m[11];
        return [m0, m1, m2, (0.5 - ((px * m0) + (py * m1) + (pz * m2))),
                m3, m4, m5, (0.5 - ((px * m3) + (py * m4) + (pz * m5))),
                m6, m7, m8, (0.5 - ((px * m6) + (py * m7) + (pz * m8)))];
    },

    // Matrix 43 opeations with scalar
    m43ScalarAdd : function m43ScalarAddFn(m, s)
    {
        var r = [];
        for (var n = 0; n < 12; n += 1)
        {
            r[n] = (m[n] + s);
        }
        return r;
    },

    m43ScalarSub : function m43ScalarSubFn(m, s)
    {
        var r = [];
        for (var n = 0; n < 12; n += 1)
        {
            r[n] = (m[n] - s);
        }
        return r;
    },

    m43ScalarMul : function m43ScalarMulFn(m, s)
    {
        var r = [];
        for (var n = 0; n < 12; n += 1)
        {
            r[n] = (m[n] * s);
        }
        return r;
    },

    // Matrix44
    m44BuildIdentity : function m44BuildIdentityFn() {
        return [1.0, 0.0, 0.0, 0.0,
                0.0, 1.0, 0.0, 0.0,
                0.0, 0.0, 1.0, 0.0,
                0.0, 0.0, 0.0, 1.0];
    },

    m44Build : function m44BuildFn(r, u, a, p)
    {
        if (arguments.length >= 16)
        {
            return [arguments[0], arguments[1], arguments[2], arguments[3],
                    arguments[4], arguments[5], arguments[6], arguments[7],
                    arguments[8], arguments[9], arguments[10], arguments[11],
                    arguments[12], arguments[13], arguments[14], arguments[15]];
        }
        else
        {
            return [r[0], r[1], r[2], r[3],
                    u[0], u[1], u[2], u[3],
                    a[0], a[1], a[2], a[3],
                    p[0], p[1], p[2], p[3]];
        }
    },

    m44Copy : function m44CopyFn(m)
    {
        return m.slice();
    },

    m44Right : function m44RightFn(m)
    {
        return [m[0], m[1], m[2], m[3]];
    },

    m44Up : function m44UpFn(m)
    {
        return [m[4], m[5], m[6], m[7]];
    },

    m44At : function m44AtFn(m)
    {
        return [m[8], m[9], m[10], m[11]];
    },

    m44Pos : function m44PosFn(m)
    {
        return [m[12], m[13], m[14], m[15]];
    },

    m44SetRight : function m44SetRightFn(m, v)
    {
        m[0] = v[0];
        m[1] = v[1];
        m[2] = v[2];
        m[3] = v[3];
    },

    m44SetUp : function m44SetUpFn(m, v)
    {
        m[4] = v[0];
        m[5] = v[1];
        m[6] = v[2];
        m[7] = v[3];
    },

    m44SetAt : function m44SetAtFn(m, v)
    {
        m[8] = v[0];
        m[9] = v[1];
        m[10] = v[2];
        m[11] = v[3];
    },

    m44SetPos : function m44SetPosFn(m, v)
    {
        m[12] = v[0];
        m[13] = v[1];
        m[14] = v[2];
        m[15] = v[3];
    },

    m44Translate : function m44TranslateFn(m, v)
    {
        m[12] += v[0];
        m[13] += v[1];
        m[14] += v[2];
        m[15] += v[3];
    },

    m44Scale : function m43ScaleFn(m, scale)
    {
        var r = [];

        /*jslint white: false */
        r[0] =  m[0]  * scale[0];
        r[1] =  m[1]  * scale[0];
        r[2] =  m[2]  * scale[0];
        r[3] =  m[3];
        r[4] =  m[4]  * scale[1];
        r[5] =  m[5]  * scale[1];
        r[6] =  m[6]  * scale[1];
        r[7] =  m[7];
        r[8] =  m[8]  * scale[2];
        r[9] =  m[9]  * scale[2];
        r[10] = m[10] * scale[2];
        r[11] = m[11];
        r[12] = m[12];
        r[13] = m[13];
        r[14] = m[14];
        r[15] = m[15];
        /*jslint white: true */

        return r;
    },

    m44Transform : function m44TransformFn(m, v, dst)
    {
        var v0 = v[0];
        var v1 = v[1];
        var v2 = v[2];
        var v3 = v[3];
        if (!dst)
        {
            dst = [];
        }
        if (v3 !== 1.0)
        {
            dst[0] = ((m[0] * v0) + (m[4] * v1) + (m[8]  * v2) + (m[12] * v3));
            dst[1] = ((m[1] * v0) + (m[5] * v1) + (m[9]  * v2) + (m[13] * v3));
            dst[2] = ((m[2] * v0) + (m[6] * v1) + (m[10] * v2) + (m[14] * v3));
            dst[3] = ((m[3] * v0) + (m[7] * v1) + (m[11] * v2) + (m[15] * v3));
        }
        else
        {
            dst[0] = ((m[0] * v0) + (m[4] * v1) + (m[8]  * v2) + m[12]);
            dst[1] = ((m[1] * v0) + (m[5] * v1) + (m[9]  * v2) + m[13]);
            dst[2] = ((m[2] * v0) + (m[6] * v1) + (m[10] * v2) + m[14]);
            dst[3] = ((m[3] * v0) + (m[7] * v1) + (m[11] * v2) + m[15]);
        }
        return dst;
    },

    m44Mul : function m44MulFn(a, b)
    {
        var v4m = VMath.m44Transform;
        return VMath.m44Build(v4m(VMath.m44Right(a), b),
                              v4m(VMath.m44Up(a),    b),
                              v4m(VMath.m44At(a),    b),
                              v4m(VMath.m44Pos(a),   b));
    },

    m44Inverse : function m44InverseFn(m)
    {
        var m0 = m[0];
        var m1 = m[1];
        var m2 = m[2];
        var m3 = m[3];
        var m4 = m[4];
        var m5 = m[5];
        var m6 = m[6];
        var m7 = m[7];
        var m8 = m[8];
        var m9 = m[9];
        var m10 = m[10];
        var m11 = m[11];
        var m12 = m[12];
        var m13 = m[13];
        var m14 = m[14];
        var m15 = m[15];

        /*jslint white: false */
        var A0 = (( m0 *  m5) - ( m1 *  m4));
        var A1 = (( m0 *  m6) - ( m2 *  m4));
        var A2 = (( m0 *  m7) - ( m3 *  m4));
        var A3 = (( m1 *  m6) - ( m2 *  m5));
        var A4 = (( m1 *  m7) - ( m3 *  m5));
        var A5 = (( m2 *  m7) - ( m3 *  m6));
        var B0 = (( m8 * m13) - ( m9 * m12));
        var B1 = (( m8 * m14) - (m10 * m12));
        var B2 = (( m8 * m15) - (m11 * m12));
        var B3 = (( m9 * m14) - (m10 * m13));
        var B4 = (( m9 * m15) - (m11 * m13));
        var B5 = ((m10 * m15) - (m11 * m14));
        /*jslint white: true */

        var det = ((A0 * B5) - (A1 * B4) + (A2 * B3) + (A3 * B2) - (A4 * B1) + (A5 * B0));
        if (det === 0.0)
        {
            return [];
        }
        else
        {
            var detrecp = 1.0 / det;
            /*jslint white: false */
            return [
                (+ ( m5 * B5) - ( m6 * B4) + ( m7 * B3)) * detrecp,
                (- ( m4 * B5) + ( m6 * B2) - ( m7 * B1)) * detrecp,
                (+ ( m4 * B4) - ( m5 * B2) + ( m7 * B0)) * detrecp,
                (- ( m4 * B3) + ( m5 * B1) - ( m6 * B0)) * detrecp,
                (- ( m1 * B5) + ( m2 * B4) - ( m3 * B3)) * detrecp,
                (+ ( m0 * B5) - ( m2 * B2) + ( m3 * B1)) * detrecp,
                (- ( m0 * B4) + ( m1 * B2) - ( m3 * B0)) * detrecp,
                (+ ( m0 * B3) - ( m1 * B1) + ( m2 * B0)) * detrecp,
                (+ (m13 * A5) - (m14 * A4) + (m15 * A3)) * detrecp,
                (- (m12 * A5) + (m14 * A2) - (m15 * A1)) * detrecp,
                (+ (m12 * A4) - (m13 * A2) + (m15 * A0)) * detrecp,
                (- (m12 * A3) + (m13 * A1) - (m14 * A0)) * detrecp,
                (- ( m9 * A5) + (m10 * A4) - (m11 * A3)) * detrecp,
                (+ ( m8 * A5) - (m10 * A2) + (m11 * A1)) * detrecp,
                (- ( m8 * A4) + ( m9 * A2) - (m11 * A0)) * detrecp,
                (+ ( m8 * A3) - ( m9 * A1) + (m10 * A0)) * detrecp
            ];
            /*jsline white: true */
        }
    },

    m44Transpose : function m44TransposeFn(m)
    {
        return [m[0], m[4], m[8],  m[12],
                m[1], m[5], m[9],  m[13],
                m[2], m[6], m[10], m[14],
                m[3], m[7], m[11], m[15]];
    },

    // Matrix44 operations with scalars
    m44ScalarAdd : function m44ScalarAddFn(m, s)
    {
        var r = [];
        for (var n = 0; n < 16; n += 1)
        {
            r[n] = (m[n] + s);
        }
        return r;
    },

    m44ScalarSub : function m44ScalarSubFn(m, s)
    {
        var r = [];
        for (var n = 0; n < 16; n += 1)
        {
            r[n] = (m[n] - s);
        }
        return r;
    },

    m44ScalarMul : function m44ScalarMulFn(m, s)
    {
        var r = [];
        for (var n = 0; n < 16; n += 1)
        {
            r[n] = (m[n] * s);
        }
        return r;
    },

    // Quaternion
    quatBuild : function quatBuildFn(x, y, z, w)
    {
        return [x, y, z, w];
    },

    quatCopy : function quatCopyFn(src, dst)
    {
        if (!dst)
        {
            dst = [];
        }
        dst[0] = src[0];
        dst[1] = src[1];
        dst[2] = src[2];
        dst[3] = src[3];
        return dst;
    },

    quatIsSimilar : function quatIsSimilarFn(q1, q2)
    {
        // this compares for similar rotations not raw data
        var q1temp = q1;

        if (q1[3] * q2[3] < 0.0)
        {
            // quaternions in opposing hemispheres, negate one
            q1temp = VMath.v4Mul([-1, -1, -1, -1], q1);
        }

        var mag_sqrd = VMath.v4LengthSq(VMath.v4Sub(q1temp, q2));
        var epsilon_sqrd = (VMath.precision * VMath.precision);
        return mag_sqrd < epsilon_sqrd;
    },

    quatLength : function quatLengthFn(q)
    {
        return VMath.v4Length(q);
    },

    quatDot : function quatDotFn(q1, q2)
    {
        return VMath.v4Dot(q1, q2);
    },

    quatMul : function quatMulFn(q1, q2)
    {
        // Note quaternion multiplication is the opposite way around from our matrix multiplication
        //var v1 = q1; // use full quats to avoid copy
        //var v2 = q2;

        /*
        // Calculate the imaginary part
        var quat = VMath.v3Add3(VMath.v3ScalarMul(v2, q1[3]), VMath.v3ScalarMul(v1, q2[3]), VMath.v3Cross(v1, v2));
        // And extend with the real part
        quat[3] = (q1[3] * q2[3]) - VMath.v3Dot(v1, v2);
        */

        // Inlined from above
        var q2x = q1[0];
        var q2y = q1[1];
        var q2z = q1[2];
        var q2w = q1[3];
        var q1x = q2[0];
        var q1y = q2[1];
        var q1z = q2[2];
        var q1w = q2[3];

        var cx = (q1z * q2y) - (q1y * q2z);
        var cy = (q1x * q2z) - (q1z * q2x);
        var cz = (q1y * q2x) - (q1x * q2y);
        var qrx = (q2x * q1w) + (q1x * q2w) + cx;
        var qry = (q2y * q1w) + (q1y * q2w) + cy;
        var qrz = (q2z * q1w) + (q1z * q2w) + cz;
        var qrw = (q1w * q2w) - (q1x * q2x + q1y * q2y + q1z * q2z);
        var quat = [qrx, qry, qrz, qrw];

        return quat;
    },

    quatMulTranslate : function quatMulTranslateFn(qa, va, qb, vb, qr, vr)
    {
        var qax = qa[0];
        var qay = qa[1];
        var qaz = qa[2];
        var qaw = qa[3];
        var qbx = qb[0];
        var qby = qb[1];
        var qbz = qb[2];
        var qbw = qb[3];

        // Multiply together the two quaternions
        var cx = (qaz * qby) - (qay * qbz);
        var cy = (qax * qbz) - (qaz * qbx);
        var cz = (qay * qbx) - (qax * qby);
        qr[0] = (qbx * qaw) + (qax * qbw) + cx;
        qr[1] = (qby * qaw) + (qay * qbw) + cy;
        qr[2] = (qbz * qaw) + (qaz * qbw) + cz;
        qr[3] = (qaw * qbw) - (qax * qbx + qay * qby + qaz * qbz);

        // Transform the 2nd vector by the first quaternion and add in the first position
        var vax = va[0];
        var vay = va[1];
        var vaz = va[2];
        var vbx = vb[0];
        var vby = vb[1];
        var vbz = vb[2];

        var s = (qaw * qaw) - (qax * qax + qay * qay + qaz * qaz);
        var rx = vbx * s;
        var ry = vby * s;
        var rz = vbz * s;

        s = qax * vbx + qay * vby + qaz * vbz;

        var twoS = s + s;
        rx += qax * twoS;
        ry += qay * twoS;
        rz += qaz * twoS;

        cx = (qaz * vby) - (qay * vbz);
        cy = (qax * vbz) - (qaz * vbx);
        cz = (qay * vbx) - (qax * vby);
        var twoQw = qaw + qaw;
        rx += cx * twoQw;
        ry += cy * twoQw;
        rz += cz * twoQw;

        vr[0] = rx + vax;
        vr[1] = ry + vay;
        vr[2] = rz + vaz;
    },

    quatNormalize : function quatNormalizeFn(q)
    {
        var norme = Math.sqrt(VMath.quatDot(q, q));

        if (norme === 0.0)
        {
            return [0, 0, 0, 0];
        }
        else
        {
            var recip = 1.0 / norme;
            return VMath.v4ScalarMul(q, recip);
        }
    },

    quatConjugate : function quatConjugateFn(q)
    {
        return [-q[0], -q[1], -q[2], q[3]];
    },

    quatLerp : function quatLerpFn(q1, q2, t)
    {
        var q1x = q1[0];
        var q1y = q1[1];
        var q1z = q1[2];
        var q1w = q1[3];
        var q2x = q2[0];
        var q2y = q2[1];
        var q2z = q2[2];
        var q2w = q2[3];

        var qrx = ((q2x - q1x) * t) + q1x;
        var qry = ((q2y - q1y) * t) + q1y;
        var qrz = ((q2z - q1z) * t) + q1z;
        var qrw = ((q2w - q1w) * t) + q1w;

        return [qrx, qry, qrz, qrw];
    },

    cosMinSlerpAngle : Math.cos(Math.PI / 40.0), // use a lerp for angles <= 4.5 degrees

    quatSlerp : function quatSlerpFn(q1, q2, t, dst)
    {
        var q1x = q1[0];
        var q1y = q1[1];
        var q1z = q1[2];
        var q1w = q1[3];
        var q2x = q2[0];
        var q2y = q2[1];
        var q2z = q2[2];
        var q2w = q2[3];
        var dotq1q2 = (q1x * q2x) + (q1y * q2y) + (q1z * q2z) + (q1w * q2w);

        var cosom = dotq1q2;
        if (cosom < 0.0)
        {
            q1x = -q1x;
            q1y = -q1y;
            q1z = -q1z;
            q1w = -q1w;
            cosom = -cosom;
        }

        if (cosom > VMath.cosMinSlerpAngle)
        {
            var delta = t;
            if (dotq1q2 <= 0.0)
            {
                delta = -t;
            }

            var qrx = ((q2x - q1x) * delta) + q1x;
            var qry = ((q2y - q1y) * delta) + q1y;
            var qrz = ((q2z - q1z) * delta) + q1z;
            var qrw = ((q2w - q1w) * delta) + q1w;

            var mag = Math.sqrt((qrx * qrx) + (qry * qry) + (qrz * qrz) + (qrw * qrw));
            var recip = 1.0 / mag;
            return [qrx * recip, qry * recip, qrz * recip, qrw * recip];
        }

        var sinFn = Math.sin;
        var omega = Math.acos(cosom);
        var inv_sin_omega = 1.0 / sinFn(omega);

        var scalar = sinFn((1.0 - t) * omega) * inv_sin_omega;
        q1x = q1x * scalar;
        q1y = q1y * scalar;
        q1z = q1z * scalar;
        q1w = q1w * scalar;

        scalar = sinFn(t * omega) * inv_sin_omega;
        q2x = q2x * scalar;
        q2y = q2y * scalar;
        q2z = q2z * scalar;
        q2w = q2w * scalar;

        if (!dst)
        {
            dst = [];
        }

        dst[0] =  q1x + q2x;
        dst[1] =  q1y + q2y;
        dst[2] =  q1z + q2z;
        dst[3] =  q1w + q2w;

        return dst;
    },

    quatFromM43 : function quatFromM43Fn(m)
    {
        var m0 = m[0];
        var m1 = m[1];
        var m2 = m[2];
        var m3 = m[3];
        var m4 = m[4];
        var m5 = m[5];
        var m6 = m[6];
        var m7 = m[7];
        var m8 = m[8];

        var x, y, z, w, s;
        var trace = m0 + m4 + m8 + 1;
        if (trace > VMath.precision)
        {
            w = Math.sqrt(trace) / 2;
            x = (m5 - m7) / (4 * w);
            y = (m6 - m2) / (4 * w);
            z = (m1 - m3) / (4 * w);
        }
        else
        {
            if ((m0 > m4) && (m0 > m8))
            {
                s = Math.sqrt(1.0 + m0 - m4 - m8) * 2; // S=4*qx
                w = (m5 - m7) / s;
                x = 0.25 * s;
                y = (m3 + m1) / s;
                z = (m6 + m2) / s;
            }
            else if (m4 > m8)
            {
                s = Math.sqrt(1.0 + m4 - m0 - m8) * 2; // S=4*qy
                w = (m6 - m2) / s;
                x = (m3 + m1) / s;
                y = 0.25 * s;
                z = (m7 + m5) / s;
            }
            else
            {
                s = Math.sqrt(1.0 + m8 - m0 - m4) * 2; // S=4*qz
                w = (m1 - m3) / s;
                x = (m6 + m2) / s;
                y = (m7 + m5) / s;
                z = 0.25 * s;
            }
        }

        var q = VMath.quatNormalize([x, y, z, w]);

        return VMath.quatConjugate(q);
    },

    quatFromAxisRotation : function quatFromAxisRotationFn(axis, angle)
    {
        var omega = 0.5 * angle;
        var s = Math.sin(omega);
        var c = Math.cos(omega);

        var q = [axis[0] * s, axis[1] * s, axis[2] * s, c];
        return VMath.quatNormalize(q);
    },

    quatToAxisRotation : function quatToAxisRotation(q)
    {
        var angle = Math.acos(q[3]) * 2.0;

        var sin_sqrd = 1.0 - q[3] * q[3];

        if (sin_sqrd < VMath.precision)
        {
            // we can return any axis
            return [1.0, 0.0, 0.0, angle];
        }
        else
        {
            var scale = 1.0 / Math.sqrt(sin_sqrd);
            return [q[0] * scale, q[1] * scale, q[2] * scale, angle];
        }
    },

    quatTransformVector : function quatTransformVectorFn(q, v)
    {
        /*
        var qimaginary = q; // Use full quat directly to avoid copy
        var qw = q[3];

        var s = (qw * qw) - VMath.v3Dot(qimaginary, qimaginary);

        var r = VMath.v3ScalarMul(v, s);

        s = VMath.v3Dot(qimaginary, v);
        r = VMath.v3Add(r, VMath.v3ScalarMul(qimaginary, s + s));
        r = VMath.v3Add(r, VMath.v3ScalarMul(VMath.v3Cross(qimaginary, v), qw + qw));
        */

        // Inlined from above
        var qx = -q[0];
        var qy = -q[1];
        var qz = -q[2];
        var qw = q[3];

        var vx = v[0];
        var vy = v[1];
        var vz = v[2];

        //var s = (qw * qw) - VMath.v3Dot(qimaginary, qimaginary);
        var s = (qw * qw) - (qx * qx + qy * qy + qz * qz);

        //var r = VMath.v3ScalarMul(v, s);
        var rx = vx * s;
        var ry = vy * s;
        var rz = vz * s;

        //s = VMath.v3Dot(qimaginary, v);
        s = qx * vx + qy * vy + qz * vz;

        //r = VMath.v3Add(r, VMath.v3ScalarMul(qimaginary, s + s));
        var twoS = s + s;
        rx += qx * twoS;
        ry += qy * twoS;
        rz += qz * twoS;

        //r = VMath.v3Add(r, VMath.v3ScalarMul(VMath.v3Cross(VMath.v3Neg(qimaginary), v), qw + qw));
        var cx = (qz * vy) - (qy * vz);
        var cy = (qx * vz) - (qz * vx);
        var cz = (qy * vx) - (qx * vy);
        var twoQw = qw + qw;
        rx += cx * twoQw;
        ry += cy * twoQw;
        rz += cz * twoQw;

        var r = [rx, ry, rz];

        return r;
    },

    quatEqual : function quatEqual(q1, q2, precision)
    {
        if (precision === undefined)
        {
            precision = this.precision;
        }
        var abs = Math.abs;
        return (abs(q1[0] - q2[0]) <= precision &&
                abs(q1[1] - q2[1]) <= precision &&
                abs(q1[2] - q2[2]) <= precision &&
                abs(q1[3] - q2[3]) <= precision);
    },

    // quatPos
    quatPosBuild : function quatPosBuildFn(x, y, z, w, px, py, pz, dst)
    {
        if (arguments.length < 7)
        {
            if (z !== undefined)
            {
                z[0] = x[0];
                z[1] = x[1];
                z[2] = x[2];
                z[3] = x[3];
                z[4] = y[0];
                z[5] = y[1];
                z[6] = y[2];
                return z;
            }
            else
            {
                return [x[0], x[1], x[2], x[3], y[0], y[1], y[2]];
            }
        }
        else
        {
            if (dst !== undefined)
            {
                dst[0] = x;
                dst[1] = y;
                dst[2] = z;
                dst[3] = w;
                dst[4] = px;
                dst[5] = py;
                dst[6] = pz;
                return dst;
            }
            else
            {
                return [ x, y, z, w, px, py, pz ];
            }
        }
    },

    quatPosTransformVector : function quatPosTransformVectorFn(qp, n)
    {
        return VMath.quatTransformVector(qp, n);
    },

    quatPosTransformPoint : function quatPosTransformPointFn(qp, p)
    {
        var offset = qp.slice(4, 7);

        var rotatedp = VMath.quatTransformVector(qp, p);
        return VMath.v3Add(rotatedp, offset);
    },

    quatPosMul : function quatPosMulFn(qp1, qp2)
    {
        var v2 = qp2.slice(4, 7);

        var qr = VMath.quatMul(qp1, qp2);
        var pr = VMath.quatPosTransformPoint(qp1, v2);
        qr[4] = pr[0];
        qr[5] = pr[1];
        qr[6] = pr[2];

        return qr;
    },

    //
    // Visibility queries
    //
    isVisibleBox : function isVisibleBoxFn(center, halfDimensions, vpm)
    {
        var abs = Math.abs;

        var c0 = center[0];
        var c1 = center[1];
        var c2 = center[2];

        var h0 = halfDimensions[0];
        var h1 = halfDimensions[1];
        var h2 = halfDimensions[2];

        var m0  = vpm[0];
        var m1  = vpm[1];
        var m2  = vpm[2];
        var m3  = vpm[3];
        var m4  = vpm[4];
        var m5  = vpm[5];
        var m6  = vpm[6];
        var m7  = vpm[7];
        var m8  = vpm[8];
        var m9  = vpm[9];
        var m10 = vpm[10];
        var m11 = vpm[11];

        var I0 = (m0  * h0);
        var I1 = (m1  * h0);
        var I2 = (m2  * h0);
        var I3 = (m3  * h0);
        var J0 = (m4  * h1);
        var J1 = (m5  * h1);
        var J2 = (m6  * h1);
        var J3 = (m7  * h1);
        var K0 = (m8  * h2);
        var K1 = (m9  * h2);
        var K2 = (m10 * h2);
        var K3 = (m11 * h2);

        var T0 = (m0 * c0 + m4 * c1 + m8  * c2 + vpm[12]);
        var T1 = (m1 * c0 + m5 * c1 + m9  * c2 + vpm[13]);
        var T2 = (m2 * c0 + m6 * c1 + m10 * c2 + vpm[14]);
        var T3 = (m3 * c0 + m7 * c1 + m11 * c2 + vpm[15]);

        return !(((T0 - T3) >  (abs(I0 - I3) + abs(J0 - J3) + abs(K0 - K3))) ||
                 ((T0 + T3) < -(abs(I0 + I3) + abs(J0 + J3) + abs(K0 + K3))) ||
                 ((T1 - T3) >  (abs(I1 - I3) + abs(J1 - J3) + abs(K1 - K3))) ||
                 ((T1 + T3) < -(abs(I1 + I3) + abs(J1 + J3) + abs(K1 + K3))) ||
                 ((T2 - T3) >  (abs(I2 - I3) + abs(J2 - J3) + abs(K2 - K3))) ||
                 ((T2 + T3) < -(abs(I2 + I3) + abs(J2 + J3) + abs(K2 + K3))) ||
               //((T3 - T3) >  (abs(I3 - I3) + abs(J3 - J3) + abs(K3 - K3))) ||
                 ((T3 + T3) < -(abs(I3 + I3) + abs(J3 + J3) + abs(K3 + K3))));
    },

    isVisibleBoxOrigin : function isVisibleBoxOriginFn(halfDimensions, vpm)
    {
        var abs = Math.abs;

        var h0 = halfDimensions[0];
        var h1 = halfDimensions[1];
        var h2 = halfDimensions[2];

        var I0 = (vpm[0]  * h0);
        var I1 = (vpm[1]  * h0);
        var I2 = (vpm[2]  * h0);
        var I3 = (vpm[3]  * h0);
        var J0 = (vpm[4]  * h1);
        var J1 = (vpm[5]  * h1);
        var J2 = (vpm[6]  * h1);
        var J3 = (vpm[7]  * h1);
        var K0 = (vpm[8]  * h2);
        var K1 = (vpm[9]  * h2);
        var K2 = (vpm[10] * h2);
        var K3 = (vpm[11] * h2);
        var T0 = vpm[12];
        var T1 = vpm[13];
        var T2 = vpm[14];
        var T3 = vpm[15];

        return !(((T0 - T3) >  (abs(I0 - I3) + abs(J0 - J3) + abs(K0 - K3))) ||
                 ((T0 + T3) < -(abs(I0 + I3) + abs(J0 + J3) + abs(K0 + K3))) ||
                 ((T1 - T3) >  (abs(I1 - I3) + abs(J1 - J3) + abs(K1 - K3))) ||
                 ((T1 + T3) < -(abs(I1 + I3) + abs(J1 + J3) + abs(K1 + K3))) ||
                 ((T2 - T3) >  (abs(I2 - I3) + abs(J2 - J3) + abs(K2 - K3))) ||
                 ((T2 + T3) < -(abs(I2 + I3) + abs(J2 + J3) + abs(K2 + K3))) ||
               //((T3 - T3) >  (abs(I3 - I3) + abs(J3 - J3) + abs(K3 - K3))) ||
                 ((T3 + T3) < -(abs(I3 + I3) + abs(J3 + J3) + abs(K3 + K3))));
    },

    isVisibleSphere : function isVisibleSphereFn(center, radius, vpm)
    {
        var abs = Math.abs;

        var c0 = center[0];
        var c1 = center[1];
        var c2 = center[2];

        var m0  = vpm[0];
        var m1  = vpm[1];
        var m2  = vpm[2];
        var m3  = vpm[3];
        var m4  = vpm[4];
        var m5  = vpm[5];
        var m6  = vpm[6];
        var m7  = vpm[7];
        var m8  = vpm[8];
        var m9  = vpm[9];
        var m10 = vpm[10];
        var m11 = vpm[11];

        var I0 = m0;
        var I1 = m1;
        var I2 = m2;
        var I3 = m3;
        var J0 = m4;
        var J1 = m5;
        var J2 = m6;
        var J3 = m7;
        var K0 = m8;
        var K1 = m9;
        var K2 = m10;
        var K3 = m11;

        var T0 = (m0 * c0 + m4 * c1 + m8  * c2 + vpm[12]);
        var T1 = (m1 * c0 + m5 * c1 + m9  * c2 + vpm[13]);
        var T2 = (m2 * c0 + m6 * c1 + m10 * c2 + vpm[14]);
        var T3 = (m3 * c0 + m7 * c1 + m11 * c2 + vpm[15]);

        var nradius = -radius;

        return !(((T0 - T3) >  radius * (abs(I0 - I3) + abs(J0 - J3) + abs(K0 - K3))) ||
                 ((T0 + T3) < nradius * (abs(I0 + I3) + abs(J0 + J3) + abs(K0 + K3))) ||
                 ((T1 - T3) >  radius * (abs(I1 - I3) + abs(J1 - J3) + abs(K1 - K3))) ||
                 ((T1 + T3) < nradius * (abs(I1 + I3) + abs(J1 + J3) + abs(K1 + K3))) ||
                 ((T2 - T3) >  radius * (abs(I2 - I3) + abs(J2 - J3) + abs(K2 - K3))) ||
                 ((T2 + T3) < nradius * (abs(I2 + I3) + abs(J2 + J3) + abs(K2 + K3))) ||
               //((T3 - T3) >  radius * (abs(I3 - I3) + abs(J3 - J3) + abs(K3 - K3))) ||
                 ((T3 + T3) < nradius * (abs(I3 + I3) + abs(J3 + J3) + abs(K3 + K3))));
    },

    isVisibleSphereOrigin : function isVisibleSphereOriginFn(radius, vpm)
    {
        var abs = Math.abs;

        var I0 = vpm[0];
        var I1 = vpm[1];
        var I2 = vpm[2];
        var I3 = vpm[3];
        var J0 = vpm[4];
        var J1 = vpm[5];
        var J2 = vpm[6];
        var J3 = vpm[7];
        var K0 = vpm[8];
        var K1 = vpm[9];
        var K2 = vpm[10];
        var K3 = vpm[11];
        var T0 = vpm[12];
        var T1 = vpm[13];
        var T2 = vpm[14];
        var T3 = vpm[15];

        var nradius = -radius;

        return !(((T0 - T3) >  radius * (abs(I0 - I3) + abs(J0 - J3) + abs(K0 - K3))) ||
                 ((T0 + T3) < nradius * (abs(I0 + I3) + abs(J0 + J3) + abs(K0 + K3))) ||
                 ((T1 - T3) >  radius * (abs(I1 - I3) + abs(J1 - J3) + abs(K1 - K3))) ||
                 ((T1 + T3) < nradius * (abs(I1 + I3) + abs(J1 + J3) + abs(K1 + K3))) ||
                 ((T2 - T3) >  radius * (abs(I2 - I3) + abs(J2 - J3) + abs(K2 - K3))) ||
                 ((T2 + T3) < nradius * (abs(I2 + I3) + abs(J2 + J3) + abs(K2 + K3))) ||
               //((T3 - T3) >  radius * (abs(I3 - I3) + abs(J3 - J3) + abs(K3 - K3))) ||
                 ((T3 + T3) < nradius * (abs(I3 + I3) + abs(J3 + J3) + abs(K3 + K3))));
    },

    isVisibleSphereUnit : function isVisibleSphereUnitFn(vpm)
    {
        var abs = Math.abs;

        var I0 = vpm[0];
        var I1 = vpm[1];
        var I2 = vpm[2];
        var I3 = vpm[3];
        var J0 = vpm[4];
        var J1 = vpm[5];
        var J2 = vpm[6];
        var J3 = vpm[7];
        var K0 = vpm[8];
        var K1 = vpm[9];
        var K2 = vpm[10];
        var K3 = vpm[11];
        var T0 = vpm[12];
        var T1 = vpm[13];
        var T2 = vpm[14];
        var T3 = vpm[15];

        return !(((T0 - T3) >  (abs(I0 - I3) + abs(J0 - J3) + abs(K0 - K3))) ||
                 ((T0 + T3) < -(abs(I0 + I3) + abs(J0 + J3) + abs(K0 + K3))) ||
                 ((T1 - T3) >  (abs(I1 - I3) + abs(J1 - J3) + abs(K1 - K3))) ||
                 ((T1 + T3) < -(abs(I1 + I3) + abs(J1 + J3) + abs(K1 + K3))) ||
                 ((T2 - T3) >  (abs(I2 - I3) + abs(J2 - J3) + abs(K2 - K3))) ||
                 ((T2 + T3) < -(abs(I2 + I3) + abs(J2 + J3) + abs(K2 + K3))) ||
               //((T3 - T3) >  (abs(I3 - I3) + abs(J3 - J3) + abs(K3 - K3))) ||
                 ((T3 + T3) < -(abs(I3 + I3) + abs(J3 + J3) + abs(K3 + K3))));
    },

    transformBox : function transformBoxFn(center, halfExtents, matrix)
    {
        var abs = Math.abs;
        var m0  = matrix[0];
        var m1  = matrix[1];
        var m2  = matrix[2];
        var m3  = matrix[3];
        var m4  = matrix[4];
        var m5  = matrix[5];
        var m6  = matrix[6];
        var m7  = matrix[7];
        var m8  = matrix[8];
        var c0 = center[0];
        var c1 = center[1];
        var c2 = center[2];
        var h0 = halfExtents[0];
        var h1 = halfExtents[1];
        var h2 = halfExtents[2];

        return {
                center : [(m0 * c0 + m3 * c1 + m6 * c2 + matrix[9]),
                          (m1 * c0 + m4 * c1 + m7 * c2 + matrix[10]),
                          (m2 * c0 + m5 * c1 + m8 * c2 + matrix[11])],

                halfExtents : [(abs(m0) * h0 + abs(m3) * h1 + abs(m6) * h2),
                               (abs(m1) * h0 + abs(m4) * h1 + abs(m7) * h2),
                               (abs(m2) * h0 + abs(m5) * h1 + abs(m8) * h2)]
            };
    },

    //
    // Planes
    //
    planeNormalize : function planeNormalizeFn(plane)
    {
        var a = plane[0];
        var b = plane[1];
        var c = plane[2];
        var lsq = ((a * a) + (b * b) + (c * c));
        if (lsq > 0.0)
        {
            var lr = 1.0 / Math.sqrt(lsq);
            return [(a * lr), (b * lr), (c * lr), (plane[3] * lr)];
        }
        else
        {
            return [0, 0, 0, 0];
        }
    },

    extractFrustumPlanes : function extractFrustumPlanesFn(m, p)
    {
        var planeNormalize = VMath.planeNormalize;
        var m0  = m[0];
        var m1  = m[1];
        var m2  = m[2];
        var m3  = m[3];
        var m4  = m[4];
        var m5  = m[5];
        var m6  = m[6];
        var m7  = m[7];
        var m8  = m[8];
        var m9  = m[9];
        var m10 = m[10];
        var m11 = m[11];
        var m12 = m[12];
        var m13 = m[13];
        var m14 = m[14];
        var m15 = m[15];
        var planes = (p || []);

        // Negate 'd' here to avoid doing it on the isVisible functions
        planes[0] = planeNormalize([(m3  + m0), (m7  + m4), (m11 + m8),  -(m15 + m12)]); // left
        planes[1] = planeNormalize([(m3  - m0), (m7  - m4), (m11 - m8),  -(m15 - m12)]); // right
        planes[2] = planeNormalize([(m3  - m1), (m7  - m5), (m11 - m9),  -(m15 - m13)]); // top
        planes[3] = planeNormalize([(m3  + m1), (m7  + m5), (m11 + m9),  -(m15 + m13)]); // bottom
        planes[4] = planeNormalize([(m3  + m2), (m7  + m6), (m11 + m10), -(m15 + m14)]);  // near
        planes[5] = planeNormalize([(m3  - m2), (m7  - m6), (m11 - m10), -(m15 - m14)]); // far

        return planes;
    },

    isInsidePlanesPoint : function isInsidePlanesPointFn(p, planes)
    {
        var p0 = p[0];
        var p1 = p[1];
        var p2 = p[2];
        var numPlanes = planes.length;
        var n = 0;
        do
        {
            var plane = planes[n];
            if ((plane[0] * p0 + plane[1] * p1 + plane[2] * p2) < plane[3])
            {
                return false;
            }
            n += 1;
        }
        while (n < numPlanes);
        return true;
    },

    isInsidePlanesSphere : function isInsidePlanesSphereFn(c, r, planes)
    {
        var c0 = c[0];
        var c1 = c[1];
        var c2 = c[2];
        var numPlanes = planes.length;
        var n = 0;
        do
        {
            var plane = planes[n];
            if ((plane[0] * c0 + plane[1] * c1 + plane[2] * c2) < (plane[3] - r))
            {
                return false;
            }
            n += 1;
        }
        while (n < numPlanes);
        return true;
    },

    isInsidePlanesBox : function isInsidePlanesBoxFn(c, h, planes)
    {
        var c0 = c[0];
        var c1 = c[1];
        var c2 = c[2];
        var h0 = h[0];
        var h1 = h[1];
        var h2 = h[2];
        var p0 = (c0 + h0);
        var p1 = (c1 + h1);
        var p2 = (c2 + h2);
        var n0 = (c0 - h0);
        var n1 = (c1 - h1);
        var n2 = (c2 - h2);
        var numPlanes = planes.length;
        var n = 0;
        do
        {
            var plane = planes[n];
            var d0 = plane[0];
            var d1 = plane[1];
            var d2 = plane[2];
            if ((d0 * (d0 < 0 ? n0 : p0) + d1 * (d1 < 0 ? n1 : p1) + d2 * (d2 < 0 ? n2 : p2)) < plane[3])
            {
                return false;
            }
            n += 1;
        }
        while (n < numPlanes);
        return true;
    },


    extractIntersectingPlanes : function extractIntersectingPlanesFn(extents, planes)
    {
        var n0 = extents[0];
        var n1 = extents[1];
        var n2 = extents[2];
        var p0 = extents[3];
        var p1 = extents[4];
        var p2 = extents[5];
        var numPlanes = planes.length;
        var p = [];
        var np = 0;
        var n = 0;
        do
        {
            var plane = planes[n];
            var d0 = plane[0];
            var d1 = plane[1];
            var d2 = plane[2];
            if ((d0 * (d0 > 0 ? n0 : p0) + d1 * (d1 > 0 ? n1 : p1) + d2 * (d2 > 0 ? n2 : p2)) < plane[3])
            {
                p[np] = plane;
                np += 1;
            }
            n += 1;
        }
        while (n < numPlanes);
        return p;
    }
};
