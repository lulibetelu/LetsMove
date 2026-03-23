import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type SportModel = runtime.Types.Result.DefaultSelection<Prisma.$SportPayload>;
export type AggregateSport = {
    _count: SportCountAggregateOutputType | null;
    _avg: SportAvgAggregateOutputType | null;
    _sum: SportSumAggregateOutputType | null;
    _min: SportMinAggregateOutputType | null;
    _max: SportMaxAggregateOutputType | null;
};
export type SportAvgAggregateOutputType = {
    id: number | null;
};
export type SportSumAggregateOutputType = {
    id: number | null;
};
export type SportMinAggregateOutputType = {
    id: number | null;
    name: string | null;
};
export type SportMaxAggregateOutputType = {
    id: number | null;
    name: string | null;
};
export type SportCountAggregateOutputType = {
    id: number;
    name: number;
    _all: number;
};
export type SportAvgAggregateInputType = {
    id?: true;
};
export type SportSumAggregateInputType = {
    id?: true;
};
export type SportMinAggregateInputType = {
    id?: true;
    name?: true;
};
export type SportMaxAggregateInputType = {
    id?: true;
    name?: true;
};
export type SportCountAggregateInputType = {
    id?: true;
    name?: true;
    _all?: true;
};
export type SportAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SportWhereInput;
    orderBy?: Prisma.SportOrderByWithRelationInput | Prisma.SportOrderByWithRelationInput[];
    cursor?: Prisma.SportWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SportCountAggregateInputType;
    _avg?: SportAvgAggregateInputType;
    _sum?: SportSumAggregateInputType;
    _min?: SportMinAggregateInputType;
    _max?: SportMaxAggregateInputType;
};
export type GetSportAggregateType<T extends SportAggregateArgs> = {
    [P in keyof T & keyof AggregateSport]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSport[P]> : Prisma.GetScalarType<T[P], AggregateSport[P]>;
};
export type SportGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SportWhereInput;
    orderBy?: Prisma.SportOrderByWithAggregationInput | Prisma.SportOrderByWithAggregationInput[];
    by: Prisma.SportScalarFieldEnum[] | Prisma.SportScalarFieldEnum;
    having?: Prisma.SportScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SportCountAggregateInputType | true;
    _avg?: SportAvgAggregateInputType;
    _sum?: SportSumAggregateInputType;
    _min?: SportMinAggregateInputType;
    _max?: SportMaxAggregateInputType;
};
export type SportGroupByOutputType = {
    id: number;
    name: string;
    _count: SportCountAggregateOutputType | null;
    _avg: SportAvgAggregateOutputType | null;
    _sum: SportSumAggregateOutputType | null;
    _min: SportMinAggregateOutputType | null;
    _max: SportMaxAggregateOutputType | null;
};
type GetSportGroupByPayload<T extends SportGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SportGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SportGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SportGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SportGroupByOutputType[P]>;
}>>;
export type SportWhereInput = {
    AND?: Prisma.SportWhereInput | Prisma.SportWhereInput[];
    OR?: Prisma.SportWhereInput[];
    NOT?: Prisma.SportWhereInput | Prisma.SportWhereInput[];
    id?: Prisma.IntFilter<"Sport"> | number;
    name?: Prisma.StringFilter<"Sport"> | string;
};
export type SportOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
};
export type SportWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    name?: string;
    AND?: Prisma.SportWhereInput | Prisma.SportWhereInput[];
    OR?: Prisma.SportWhereInput[];
    NOT?: Prisma.SportWhereInput | Prisma.SportWhereInput[];
}, "id" | "name">;
export type SportOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    _count?: Prisma.SportCountOrderByAggregateInput;
    _avg?: Prisma.SportAvgOrderByAggregateInput;
    _max?: Prisma.SportMaxOrderByAggregateInput;
    _min?: Prisma.SportMinOrderByAggregateInput;
    _sum?: Prisma.SportSumOrderByAggregateInput;
};
export type SportScalarWhereWithAggregatesInput = {
    AND?: Prisma.SportScalarWhereWithAggregatesInput | Prisma.SportScalarWhereWithAggregatesInput[];
    OR?: Prisma.SportScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SportScalarWhereWithAggregatesInput | Prisma.SportScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Sport"> | number;
    name?: Prisma.StringWithAggregatesFilter<"Sport"> | string;
};
export type SportCreateInput = {
    name: string;
};
export type SportUncheckedCreateInput = {
    id?: number;
    name: string;
};
export type SportUpdateInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type SportUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type SportCreateManyInput = {
    id?: number;
    name: string;
};
export type SportUpdateManyMutationInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type SportUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type SportCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
};
export type SportAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type SportMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
};
export type SportMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
};
export type SportSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type SportSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
}, ExtArgs["result"]["sport"]>;
export type SportSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
}, ExtArgs["result"]["sport"]>;
export type SportSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
}, ExtArgs["result"]["sport"]>;
export type SportSelectScalar = {
    id?: boolean;
    name?: boolean;
};
export type SportOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name", ExtArgs["result"]["sport"]>;
export type $SportPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Sport";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        name: string;
    }, ExtArgs["result"]["sport"]>;
    composites: {};
};
export type SportGetPayload<S extends boolean | null | undefined | SportDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SportPayload, S>;
export type SportCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SportFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SportCountAggregateInputType | true;
};
export interface SportDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Sport'];
        meta: {
            name: 'Sport';
        };
    };
    findUnique<T extends SportFindUniqueArgs>(args: Prisma.SelectSubset<T, SportFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SportClient<runtime.Types.Result.GetResult<Prisma.$SportPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends SportFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SportFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SportClient<runtime.Types.Result.GetResult<Prisma.$SportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends SportFindFirstArgs>(args?: Prisma.SelectSubset<T, SportFindFirstArgs<ExtArgs>>): Prisma.Prisma__SportClient<runtime.Types.Result.GetResult<Prisma.$SportPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends SportFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SportFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SportClient<runtime.Types.Result.GetResult<Prisma.$SportPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends SportFindManyArgs>(args?: Prisma.SelectSubset<T, SportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends SportCreateArgs>(args: Prisma.SelectSubset<T, SportCreateArgs<ExtArgs>>): Prisma.Prisma__SportClient<runtime.Types.Result.GetResult<Prisma.$SportPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends SportCreateManyArgs>(args?: Prisma.SelectSubset<T, SportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends SportCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SportPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends SportDeleteArgs>(args: Prisma.SelectSubset<T, SportDeleteArgs<ExtArgs>>): Prisma.Prisma__SportClient<runtime.Types.Result.GetResult<Prisma.$SportPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends SportUpdateArgs>(args: Prisma.SelectSubset<T, SportUpdateArgs<ExtArgs>>): Prisma.Prisma__SportClient<runtime.Types.Result.GetResult<Prisma.$SportPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends SportDeleteManyArgs>(args?: Prisma.SelectSubset<T, SportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends SportUpdateManyArgs>(args: Prisma.SelectSubset<T, SportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends SportUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SportUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SportPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends SportUpsertArgs>(args: Prisma.SelectSubset<T, SportUpsertArgs<ExtArgs>>): Prisma.Prisma__SportClient<runtime.Types.Result.GetResult<Prisma.$SportPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends SportCountArgs>(args?: Prisma.Subset<T, SportCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SportCountAggregateOutputType> : number>;
    aggregate<T extends SportAggregateArgs>(args: Prisma.Subset<T, SportAggregateArgs>): Prisma.PrismaPromise<GetSportAggregateType<T>>;
    groupBy<T extends SportGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SportGroupByArgs['orderBy'];
    } : {
        orderBy?: SportGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: SportFieldRefs;
}
export interface Prisma__SportClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface SportFieldRefs {
    readonly id: Prisma.FieldRef<"Sport", 'Int'>;
    readonly name: Prisma.FieldRef<"Sport", 'String'>;
}
export type SportFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SportSelect<ExtArgs> | null;
    omit?: Prisma.SportOmit<ExtArgs> | null;
    where: Prisma.SportWhereUniqueInput;
};
export type SportFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SportSelect<ExtArgs> | null;
    omit?: Prisma.SportOmit<ExtArgs> | null;
    where: Prisma.SportWhereUniqueInput;
};
export type SportFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SportSelect<ExtArgs> | null;
    omit?: Prisma.SportOmit<ExtArgs> | null;
    where?: Prisma.SportWhereInput;
    orderBy?: Prisma.SportOrderByWithRelationInput | Prisma.SportOrderByWithRelationInput[];
    cursor?: Prisma.SportWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SportScalarFieldEnum | Prisma.SportScalarFieldEnum[];
};
export type SportFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SportSelect<ExtArgs> | null;
    omit?: Prisma.SportOmit<ExtArgs> | null;
    where?: Prisma.SportWhereInput;
    orderBy?: Prisma.SportOrderByWithRelationInput | Prisma.SportOrderByWithRelationInput[];
    cursor?: Prisma.SportWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SportScalarFieldEnum | Prisma.SportScalarFieldEnum[];
};
export type SportFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SportSelect<ExtArgs> | null;
    omit?: Prisma.SportOmit<ExtArgs> | null;
    where?: Prisma.SportWhereInput;
    orderBy?: Prisma.SportOrderByWithRelationInput | Prisma.SportOrderByWithRelationInput[];
    cursor?: Prisma.SportWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SportScalarFieldEnum | Prisma.SportScalarFieldEnum[];
};
export type SportCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SportSelect<ExtArgs> | null;
    omit?: Prisma.SportOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SportCreateInput, Prisma.SportUncheckedCreateInput>;
};
export type SportCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.SportCreateManyInput | Prisma.SportCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SportCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SportSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SportOmit<ExtArgs> | null;
    data: Prisma.SportCreateManyInput | Prisma.SportCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SportUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SportSelect<ExtArgs> | null;
    omit?: Prisma.SportOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SportUpdateInput, Prisma.SportUncheckedUpdateInput>;
    where: Prisma.SportWhereUniqueInput;
};
export type SportUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.SportUpdateManyMutationInput, Prisma.SportUncheckedUpdateManyInput>;
    where?: Prisma.SportWhereInput;
    limit?: number;
};
export type SportUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SportSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SportOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SportUpdateManyMutationInput, Prisma.SportUncheckedUpdateManyInput>;
    where?: Prisma.SportWhereInput;
    limit?: number;
};
export type SportUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SportSelect<ExtArgs> | null;
    omit?: Prisma.SportOmit<ExtArgs> | null;
    where: Prisma.SportWhereUniqueInput;
    create: Prisma.XOR<Prisma.SportCreateInput, Prisma.SportUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.SportUpdateInput, Prisma.SportUncheckedUpdateInput>;
};
export type SportDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SportSelect<ExtArgs> | null;
    omit?: Prisma.SportOmit<ExtArgs> | null;
    where: Prisma.SportWhereUniqueInput;
};
export type SportDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SportWhereInput;
    limit?: number;
};
export type SportDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SportSelect<ExtArgs> | null;
    omit?: Prisma.SportOmit<ExtArgs> | null;
};
export {};
