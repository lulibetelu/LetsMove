import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type LocationModel = runtime.Types.Result.DefaultSelection<Prisma.$LocationPayload>;
export type AggregateLocation = {
    _count: LocationCountAggregateOutputType | null;
    _avg: LocationAvgAggregateOutputType | null;
    _sum: LocationSumAggregateOutputType | null;
    _min: LocationMinAggregateOutputType | null;
    _max: LocationMaxAggregateOutputType | null;
};
export type LocationAvgAggregateOutputType = {
    id: number | null;
    latitude: number | null;
    longitude: number | null;
};
export type LocationSumAggregateOutputType = {
    id: number | null;
    latitude: number | null;
    longitude: number | null;
};
export type LocationMinAggregateOutputType = {
    id: number | null;
    location: string | null;
    latitude: number | null;
    longitude: number | null;
};
export type LocationMaxAggregateOutputType = {
    id: number | null;
    location: string | null;
    latitude: number | null;
    longitude: number | null;
};
export type LocationCountAggregateOutputType = {
    id: number;
    location: number;
    latitude: number;
    longitude: number;
    _all: number;
};
export type LocationAvgAggregateInputType = {
    id?: true;
    latitude?: true;
    longitude?: true;
};
export type LocationSumAggregateInputType = {
    id?: true;
    latitude?: true;
    longitude?: true;
};
export type LocationMinAggregateInputType = {
    id?: true;
    location?: true;
    latitude?: true;
    longitude?: true;
};
export type LocationMaxAggregateInputType = {
    id?: true;
    location?: true;
    latitude?: true;
    longitude?: true;
};
export type LocationCountAggregateInputType = {
    id?: true;
    location?: true;
    latitude?: true;
    longitude?: true;
    _all?: true;
};
export type LocationAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LocationWhereInput;
    orderBy?: Prisma.LocationOrderByWithRelationInput | Prisma.LocationOrderByWithRelationInput[];
    cursor?: Prisma.LocationWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | LocationCountAggregateInputType;
    _avg?: LocationAvgAggregateInputType;
    _sum?: LocationSumAggregateInputType;
    _min?: LocationMinAggregateInputType;
    _max?: LocationMaxAggregateInputType;
};
export type GetLocationAggregateType<T extends LocationAggregateArgs> = {
    [P in keyof T & keyof AggregateLocation]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateLocation[P]> : Prisma.GetScalarType<T[P], AggregateLocation[P]>;
};
export type LocationGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LocationWhereInput;
    orderBy?: Prisma.LocationOrderByWithAggregationInput | Prisma.LocationOrderByWithAggregationInput[];
    by: Prisma.LocationScalarFieldEnum[] | Prisma.LocationScalarFieldEnum;
    having?: Prisma.LocationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: LocationCountAggregateInputType | true;
    _avg?: LocationAvgAggregateInputType;
    _sum?: LocationSumAggregateInputType;
    _min?: LocationMinAggregateInputType;
    _max?: LocationMaxAggregateInputType;
};
export type LocationGroupByOutputType = {
    id: number;
    location: string;
    latitude: number;
    longitude: number;
    _count: LocationCountAggregateOutputType | null;
    _avg: LocationAvgAggregateOutputType | null;
    _sum: LocationSumAggregateOutputType | null;
    _min: LocationMinAggregateOutputType | null;
    _max: LocationMaxAggregateOutputType | null;
};
type GetLocationGroupByPayload<T extends LocationGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<LocationGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof LocationGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], LocationGroupByOutputType[P]> : Prisma.GetScalarType<T[P], LocationGroupByOutputType[P]>;
}>>;
export type LocationWhereInput = {
    AND?: Prisma.LocationWhereInput | Prisma.LocationWhereInput[];
    OR?: Prisma.LocationWhereInput[];
    NOT?: Prisma.LocationWhereInput | Prisma.LocationWhereInput[];
    id?: Prisma.IntFilter<"Location"> | number;
    location?: Prisma.StringFilter<"Location"> | string;
    latitude?: Prisma.FloatFilter<"Location"> | number;
    longitude?: Prisma.FloatFilter<"Location"> | number;
};
export type LocationOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
};
export type LocationWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.LocationWhereInput | Prisma.LocationWhereInput[];
    OR?: Prisma.LocationWhereInput[];
    NOT?: Prisma.LocationWhereInput | Prisma.LocationWhereInput[];
    location?: Prisma.StringFilter<"Location"> | string;
    latitude?: Prisma.FloatFilter<"Location"> | number;
    longitude?: Prisma.FloatFilter<"Location"> | number;
}, "id">;
export type LocationOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    _count?: Prisma.LocationCountOrderByAggregateInput;
    _avg?: Prisma.LocationAvgOrderByAggregateInput;
    _max?: Prisma.LocationMaxOrderByAggregateInput;
    _min?: Prisma.LocationMinOrderByAggregateInput;
    _sum?: Prisma.LocationSumOrderByAggregateInput;
};
export type LocationScalarWhereWithAggregatesInput = {
    AND?: Prisma.LocationScalarWhereWithAggregatesInput | Prisma.LocationScalarWhereWithAggregatesInput[];
    OR?: Prisma.LocationScalarWhereWithAggregatesInput[];
    NOT?: Prisma.LocationScalarWhereWithAggregatesInput | Prisma.LocationScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Location"> | number;
    location?: Prisma.StringWithAggregatesFilter<"Location"> | string;
    latitude?: Prisma.FloatWithAggregatesFilter<"Location"> | number;
    longitude?: Prisma.FloatWithAggregatesFilter<"Location"> | number;
};
export type LocationCreateInput = {
    location: string;
    latitude: number;
    longitude: number;
};
export type LocationUncheckedCreateInput = {
    id?: number;
    location: string;
    latitude: number;
    longitude: number;
};
export type LocationUpdateInput = {
    location?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.FloatFieldUpdateOperationsInput | number;
    longitude?: Prisma.FloatFieldUpdateOperationsInput | number;
};
export type LocationUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    location?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.FloatFieldUpdateOperationsInput | number;
    longitude?: Prisma.FloatFieldUpdateOperationsInput | number;
};
export type LocationCreateManyInput = {
    id?: number;
    location: string;
    latitude: number;
    longitude: number;
};
export type LocationUpdateManyMutationInput = {
    location?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.FloatFieldUpdateOperationsInput | number;
    longitude?: Prisma.FloatFieldUpdateOperationsInput | number;
};
export type LocationUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    location?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.FloatFieldUpdateOperationsInput | number;
    longitude?: Prisma.FloatFieldUpdateOperationsInput | number;
};
export type LocationCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
};
export type LocationAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
};
export type LocationMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
};
export type LocationMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
};
export type LocationSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
};
export type FloatFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type LocationSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    location?: boolean;
    latitude?: boolean;
    longitude?: boolean;
}, ExtArgs["result"]["location"]>;
export type LocationSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    location?: boolean;
    latitude?: boolean;
    longitude?: boolean;
}, ExtArgs["result"]["location"]>;
export type LocationSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    location?: boolean;
    latitude?: boolean;
    longitude?: boolean;
}, ExtArgs["result"]["location"]>;
export type LocationSelectScalar = {
    id?: boolean;
    location?: boolean;
    latitude?: boolean;
    longitude?: boolean;
};
export type LocationOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "location" | "latitude" | "longitude", ExtArgs["result"]["location"]>;
export type $LocationPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Location";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        location: string;
        latitude: number;
        longitude: number;
    }, ExtArgs["result"]["location"]>;
    composites: {};
};
export type LocationGetPayload<S extends boolean | null | undefined | LocationDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$LocationPayload, S>;
export type LocationCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<LocationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: LocationCountAggregateInputType | true;
};
export interface LocationDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Location'];
        meta: {
            name: 'Location';
        };
    };
    findUnique<T extends LocationFindUniqueArgs>(args: Prisma.SelectSubset<T, LocationFindUniqueArgs<ExtArgs>>): Prisma.Prisma__LocationClient<runtime.Types.Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends LocationFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, LocationFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__LocationClient<runtime.Types.Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends LocationFindFirstArgs>(args?: Prisma.SelectSubset<T, LocationFindFirstArgs<ExtArgs>>): Prisma.Prisma__LocationClient<runtime.Types.Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends LocationFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, LocationFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__LocationClient<runtime.Types.Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends LocationFindManyArgs>(args?: Prisma.SelectSubset<T, LocationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends LocationCreateArgs>(args: Prisma.SelectSubset<T, LocationCreateArgs<ExtArgs>>): Prisma.Prisma__LocationClient<runtime.Types.Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends LocationCreateManyArgs>(args?: Prisma.SelectSubset<T, LocationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends LocationCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, LocationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends LocationDeleteArgs>(args: Prisma.SelectSubset<T, LocationDeleteArgs<ExtArgs>>): Prisma.Prisma__LocationClient<runtime.Types.Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends LocationUpdateArgs>(args: Prisma.SelectSubset<T, LocationUpdateArgs<ExtArgs>>): Prisma.Prisma__LocationClient<runtime.Types.Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends LocationDeleteManyArgs>(args?: Prisma.SelectSubset<T, LocationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends LocationUpdateManyArgs>(args: Prisma.SelectSubset<T, LocationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends LocationUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, LocationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends LocationUpsertArgs>(args: Prisma.SelectSubset<T, LocationUpsertArgs<ExtArgs>>): Prisma.Prisma__LocationClient<runtime.Types.Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends LocationCountArgs>(args?: Prisma.Subset<T, LocationCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], LocationCountAggregateOutputType> : number>;
    aggregate<T extends LocationAggregateArgs>(args: Prisma.Subset<T, LocationAggregateArgs>): Prisma.PrismaPromise<GetLocationAggregateType<T>>;
    groupBy<T extends LocationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: LocationGroupByArgs['orderBy'];
    } : {
        orderBy?: LocationGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, LocationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: LocationFieldRefs;
}
export interface Prisma__LocationClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface LocationFieldRefs {
    readonly id: Prisma.FieldRef<"Location", 'Int'>;
    readonly location: Prisma.FieldRef<"Location", 'String'>;
    readonly latitude: Prisma.FieldRef<"Location", 'Float'>;
    readonly longitude: Prisma.FieldRef<"Location", 'Float'>;
}
export type LocationFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LocationSelect<ExtArgs> | null;
    omit?: Prisma.LocationOmit<ExtArgs> | null;
    where: Prisma.LocationWhereUniqueInput;
};
export type LocationFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LocationSelect<ExtArgs> | null;
    omit?: Prisma.LocationOmit<ExtArgs> | null;
    where: Prisma.LocationWhereUniqueInput;
};
export type LocationFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LocationSelect<ExtArgs> | null;
    omit?: Prisma.LocationOmit<ExtArgs> | null;
    where?: Prisma.LocationWhereInput;
    orderBy?: Prisma.LocationOrderByWithRelationInput | Prisma.LocationOrderByWithRelationInput[];
    cursor?: Prisma.LocationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LocationScalarFieldEnum | Prisma.LocationScalarFieldEnum[];
};
export type LocationFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LocationSelect<ExtArgs> | null;
    omit?: Prisma.LocationOmit<ExtArgs> | null;
    where?: Prisma.LocationWhereInput;
    orderBy?: Prisma.LocationOrderByWithRelationInput | Prisma.LocationOrderByWithRelationInput[];
    cursor?: Prisma.LocationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LocationScalarFieldEnum | Prisma.LocationScalarFieldEnum[];
};
export type LocationFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LocationSelect<ExtArgs> | null;
    omit?: Prisma.LocationOmit<ExtArgs> | null;
    where?: Prisma.LocationWhereInput;
    orderBy?: Prisma.LocationOrderByWithRelationInput | Prisma.LocationOrderByWithRelationInput[];
    cursor?: Prisma.LocationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LocationScalarFieldEnum | Prisma.LocationScalarFieldEnum[];
};
export type LocationCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LocationSelect<ExtArgs> | null;
    omit?: Prisma.LocationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LocationCreateInput, Prisma.LocationUncheckedCreateInput>;
};
export type LocationCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.LocationCreateManyInput | Prisma.LocationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type LocationCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LocationSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.LocationOmit<ExtArgs> | null;
    data: Prisma.LocationCreateManyInput | Prisma.LocationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type LocationUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LocationSelect<ExtArgs> | null;
    omit?: Prisma.LocationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LocationUpdateInput, Prisma.LocationUncheckedUpdateInput>;
    where: Prisma.LocationWhereUniqueInput;
};
export type LocationUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.LocationUpdateManyMutationInput, Prisma.LocationUncheckedUpdateManyInput>;
    where?: Prisma.LocationWhereInput;
    limit?: number;
};
export type LocationUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LocationSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.LocationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LocationUpdateManyMutationInput, Prisma.LocationUncheckedUpdateManyInput>;
    where?: Prisma.LocationWhereInput;
    limit?: number;
};
export type LocationUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LocationSelect<ExtArgs> | null;
    omit?: Prisma.LocationOmit<ExtArgs> | null;
    where: Prisma.LocationWhereUniqueInput;
    create: Prisma.XOR<Prisma.LocationCreateInput, Prisma.LocationUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.LocationUpdateInput, Prisma.LocationUncheckedUpdateInput>;
};
export type LocationDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LocationSelect<ExtArgs> | null;
    omit?: Prisma.LocationOmit<ExtArgs> | null;
    where: Prisma.LocationWhereUniqueInput;
};
export type LocationDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LocationWhereInput;
    limit?: number;
};
export type LocationDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LocationSelect<ExtArgs> | null;
    omit?: Prisma.LocationOmit<ExtArgs> | null;
};
export {};
