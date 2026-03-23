import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PreferenceModel = runtime.Types.Result.DefaultSelection<Prisma.$PreferencePayload>;
export type AggregatePreference = {
    _count: PreferenceCountAggregateOutputType | null;
    _avg: PreferenceAvgAggregateOutputType | null;
    _sum: PreferenceSumAggregateOutputType | null;
    _min: PreferenceMinAggregateOutputType | null;
    _max: PreferenceMaxAggregateOutputType | null;
};
export type PreferenceAvgAggregateOutputType = {
    id: number | null;
    sportId: number | null;
    userId: number | null;
};
export type PreferenceSumAggregateOutputType = {
    id: number | null;
    sportId: number | null;
    userId: number | null;
};
export type PreferenceMinAggregateOutputType = {
    id: number | null;
    sportId: number | null;
    userId: number | null;
    level: string | null;
};
export type PreferenceMaxAggregateOutputType = {
    id: number | null;
    sportId: number | null;
    userId: number | null;
    level: string | null;
};
export type PreferenceCountAggregateOutputType = {
    id: number;
    sportId: number;
    userId: number;
    level: number;
    _all: number;
};
export type PreferenceAvgAggregateInputType = {
    id?: true;
    sportId?: true;
    userId?: true;
};
export type PreferenceSumAggregateInputType = {
    id?: true;
    sportId?: true;
    userId?: true;
};
export type PreferenceMinAggregateInputType = {
    id?: true;
    sportId?: true;
    userId?: true;
    level?: true;
};
export type PreferenceMaxAggregateInputType = {
    id?: true;
    sportId?: true;
    userId?: true;
    level?: true;
};
export type PreferenceCountAggregateInputType = {
    id?: true;
    sportId?: true;
    userId?: true;
    level?: true;
    _all?: true;
};
export type PreferenceAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PreferenceWhereInput;
    orderBy?: Prisma.PreferenceOrderByWithRelationInput | Prisma.PreferenceOrderByWithRelationInput[];
    cursor?: Prisma.PreferenceWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PreferenceCountAggregateInputType;
    _avg?: PreferenceAvgAggregateInputType;
    _sum?: PreferenceSumAggregateInputType;
    _min?: PreferenceMinAggregateInputType;
    _max?: PreferenceMaxAggregateInputType;
};
export type GetPreferenceAggregateType<T extends PreferenceAggregateArgs> = {
    [P in keyof T & keyof AggregatePreference]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePreference[P]> : Prisma.GetScalarType<T[P], AggregatePreference[P]>;
};
export type PreferenceGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PreferenceWhereInput;
    orderBy?: Prisma.PreferenceOrderByWithAggregationInput | Prisma.PreferenceOrderByWithAggregationInput[];
    by: Prisma.PreferenceScalarFieldEnum[] | Prisma.PreferenceScalarFieldEnum;
    having?: Prisma.PreferenceScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PreferenceCountAggregateInputType | true;
    _avg?: PreferenceAvgAggregateInputType;
    _sum?: PreferenceSumAggregateInputType;
    _min?: PreferenceMinAggregateInputType;
    _max?: PreferenceMaxAggregateInputType;
};
export type PreferenceGroupByOutputType = {
    id: number;
    sportId: number;
    userId: number;
    level: string;
    _count: PreferenceCountAggregateOutputType | null;
    _avg: PreferenceAvgAggregateOutputType | null;
    _sum: PreferenceSumAggregateOutputType | null;
    _min: PreferenceMinAggregateOutputType | null;
    _max: PreferenceMaxAggregateOutputType | null;
};
type GetPreferenceGroupByPayload<T extends PreferenceGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PreferenceGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PreferenceGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PreferenceGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PreferenceGroupByOutputType[P]>;
}>>;
export type PreferenceWhereInput = {
    AND?: Prisma.PreferenceWhereInput | Prisma.PreferenceWhereInput[];
    OR?: Prisma.PreferenceWhereInput[];
    NOT?: Prisma.PreferenceWhereInput | Prisma.PreferenceWhereInput[];
    id?: Prisma.IntFilter<"Preference"> | number;
    sportId?: Prisma.IntFilter<"Preference"> | number;
    userId?: Prisma.IntFilter<"Preference"> | number;
    level?: Prisma.StringFilter<"Preference"> | string;
};
export type PreferenceOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    sportId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    level?: Prisma.SortOrder;
};
export type PreferenceWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.PreferenceWhereInput | Prisma.PreferenceWhereInput[];
    OR?: Prisma.PreferenceWhereInput[];
    NOT?: Prisma.PreferenceWhereInput | Prisma.PreferenceWhereInput[];
    sportId?: Prisma.IntFilter<"Preference"> | number;
    userId?: Prisma.IntFilter<"Preference"> | number;
    level?: Prisma.StringFilter<"Preference"> | string;
}, "id">;
export type PreferenceOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    sportId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    level?: Prisma.SortOrder;
    _count?: Prisma.PreferenceCountOrderByAggregateInput;
    _avg?: Prisma.PreferenceAvgOrderByAggregateInput;
    _max?: Prisma.PreferenceMaxOrderByAggregateInput;
    _min?: Prisma.PreferenceMinOrderByAggregateInput;
    _sum?: Prisma.PreferenceSumOrderByAggregateInput;
};
export type PreferenceScalarWhereWithAggregatesInput = {
    AND?: Prisma.PreferenceScalarWhereWithAggregatesInput | Prisma.PreferenceScalarWhereWithAggregatesInput[];
    OR?: Prisma.PreferenceScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PreferenceScalarWhereWithAggregatesInput | Prisma.PreferenceScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Preference"> | number;
    sportId?: Prisma.IntWithAggregatesFilter<"Preference"> | number;
    userId?: Prisma.IntWithAggregatesFilter<"Preference"> | number;
    level?: Prisma.StringWithAggregatesFilter<"Preference"> | string;
};
export type PreferenceCreateInput = {
    level: string;
};
export type PreferenceUncheckedCreateInput = {
    id?: number;
    sportId: number;
    userId: number;
    level: string;
};
export type PreferenceUpdateInput = {
    level?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PreferenceUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    sportId?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    level?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PreferenceCreateManyInput = {
    id?: number;
    sportId: number;
    userId: number;
    level: string;
};
export type PreferenceUpdateManyMutationInput = {
    level?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PreferenceUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    sportId?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    level?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PreferenceCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sportId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    level?: Prisma.SortOrder;
};
export type PreferenceAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sportId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type PreferenceMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sportId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    level?: Prisma.SortOrder;
};
export type PreferenceMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sportId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    level?: Prisma.SortOrder;
};
export type PreferenceSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sportId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type PreferenceSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sportId?: boolean;
    userId?: boolean;
    level?: boolean;
}, ExtArgs["result"]["preference"]>;
export type PreferenceSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sportId?: boolean;
    userId?: boolean;
    level?: boolean;
}, ExtArgs["result"]["preference"]>;
export type PreferenceSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sportId?: boolean;
    userId?: boolean;
    level?: boolean;
}, ExtArgs["result"]["preference"]>;
export type PreferenceSelectScalar = {
    id?: boolean;
    sportId?: boolean;
    userId?: boolean;
    level?: boolean;
};
export type PreferenceOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "sportId" | "userId" | "level", ExtArgs["result"]["preference"]>;
export type PreferenceInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type PreferenceIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type PreferenceIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $PreferencePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Preference";
    objects: {
        sport: Prisma.$SportPayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        sportId: number;
        userId: number;
        level: string;
    }, ExtArgs["result"]["preference"]>;
    composites: {};
};
export type PreferenceGetPayload<S extends boolean | null | undefined | PreferenceDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PreferencePayload, S>;
export type PreferenceCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PreferenceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PreferenceCountAggregateInputType | true;
};
export interface PreferenceDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Preference'];
        meta: {
            name: 'Preference';
        };
    };
    findUnique<T extends PreferenceFindUniqueArgs>(args: Prisma.SelectSubset<T, PreferenceFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PreferenceClient<runtime.Types.Result.GetResult<Prisma.$PreferencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PreferenceFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PreferenceFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PreferenceClient<runtime.Types.Result.GetResult<Prisma.$PreferencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PreferenceFindFirstArgs>(args?: Prisma.SelectSubset<T, PreferenceFindFirstArgs<ExtArgs>>): Prisma.Prisma__PreferenceClient<runtime.Types.Result.GetResult<Prisma.$PreferencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PreferenceFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PreferenceFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PreferenceClient<runtime.Types.Result.GetResult<Prisma.$PreferencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PreferenceFindManyArgs>(args?: Prisma.SelectSubset<T, PreferenceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PreferencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PreferenceCreateArgs>(args: Prisma.SelectSubset<T, PreferenceCreateArgs<ExtArgs>>): Prisma.Prisma__PreferenceClient<runtime.Types.Result.GetResult<Prisma.$PreferencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PreferenceCreateManyArgs>(args?: Prisma.SelectSubset<T, PreferenceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PreferenceCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PreferenceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PreferencePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PreferenceDeleteArgs>(args: Prisma.SelectSubset<T, PreferenceDeleteArgs<ExtArgs>>): Prisma.Prisma__PreferenceClient<runtime.Types.Result.GetResult<Prisma.$PreferencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PreferenceUpdateArgs>(args: Prisma.SelectSubset<T, PreferenceUpdateArgs<ExtArgs>>): Prisma.Prisma__PreferenceClient<runtime.Types.Result.GetResult<Prisma.$PreferencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PreferenceDeleteManyArgs>(args?: Prisma.SelectSubset<T, PreferenceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PreferenceUpdateManyArgs>(args: Prisma.SelectSubset<T, PreferenceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PreferenceUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PreferenceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PreferencePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PreferenceUpsertArgs>(args: Prisma.SelectSubset<T, PreferenceUpsertArgs<ExtArgs>>): Prisma.Prisma__PreferenceClient<runtime.Types.Result.GetResult<Prisma.$PreferencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PreferenceCountArgs>(args?: Prisma.Subset<T, PreferenceCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PreferenceCountAggregateOutputType> : number>;
    aggregate<T extends PreferenceAggregateArgs>(args: Prisma.Subset<T, PreferenceAggregateArgs>): Prisma.PrismaPromise<GetPreferenceAggregateType<T>>;
    groupBy<T extends PreferenceGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PreferenceGroupByArgs['orderBy'];
    } : {
        orderBy?: PreferenceGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PreferenceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPreferenceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PreferenceFieldRefs;
}
export interface Prisma__PreferenceClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PreferenceFieldRefs {
    readonly id: Prisma.FieldRef<"Preference", 'Int'>;
    readonly sportId: Prisma.FieldRef<"Preference", 'Int'>;
    readonly userId: Prisma.FieldRef<"Preference", 'Int'>;
    readonly level: Prisma.FieldRef<"Preference", 'String'>;
}
export type PreferenceFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PreferenceSelect<ExtArgs> | null;
    omit?: Prisma.PreferenceOmit<ExtArgs> | null;
    where: Prisma.PreferenceWhereUniqueInput;
};
export type PreferenceFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PreferenceSelect<ExtArgs> | null;
    omit?: Prisma.PreferenceOmit<ExtArgs> | null;
    where: Prisma.PreferenceWhereUniqueInput;
};
export type PreferenceFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PreferenceSelect<ExtArgs> | null;
    omit?: Prisma.PreferenceOmit<ExtArgs> | null;
    where?: Prisma.PreferenceWhereInput;
    orderBy?: Prisma.PreferenceOrderByWithRelationInput | Prisma.PreferenceOrderByWithRelationInput[];
    cursor?: Prisma.PreferenceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PreferenceScalarFieldEnum | Prisma.PreferenceScalarFieldEnum[];
};
export type PreferenceFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PreferenceSelect<ExtArgs> | null;
    omit?: Prisma.PreferenceOmit<ExtArgs> | null;
    where?: Prisma.PreferenceWhereInput;
    orderBy?: Prisma.PreferenceOrderByWithRelationInput | Prisma.PreferenceOrderByWithRelationInput[];
    cursor?: Prisma.PreferenceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PreferenceScalarFieldEnum | Prisma.PreferenceScalarFieldEnum[];
};
export type PreferenceFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PreferenceSelect<ExtArgs> | null;
    omit?: Prisma.PreferenceOmit<ExtArgs> | null;
    where?: Prisma.PreferenceWhereInput;
    orderBy?: Prisma.PreferenceOrderByWithRelationInput | Prisma.PreferenceOrderByWithRelationInput[];
    cursor?: Prisma.PreferenceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PreferenceScalarFieldEnum | Prisma.PreferenceScalarFieldEnum[];
};
export type PreferenceCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PreferenceSelect<ExtArgs> | null;
    omit?: Prisma.PreferenceOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PreferenceCreateInput, Prisma.PreferenceUncheckedCreateInput>;
};
export type PreferenceCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PreferenceCreateManyInput | Prisma.PreferenceCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PreferenceCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PreferenceSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PreferenceOmit<ExtArgs> | null;
    data: Prisma.PreferenceCreateManyInput | Prisma.PreferenceCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PreferenceUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PreferenceSelect<ExtArgs> | null;
    omit?: Prisma.PreferenceOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PreferenceUpdateInput, Prisma.PreferenceUncheckedUpdateInput>;
    where: Prisma.PreferenceWhereUniqueInput;
};
export type PreferenceUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PreferenceUpdateManyMutationInput, Prisma.PreferenceUncheckedUpdateManyInput>;
    where?: Prisma.PreferenceWhereInput;
    limit?: number;
};
export type PreferenceUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PreferenceSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PreferenceOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PreferenceUpdateManyMutationInput, Prisma.PreferenceUncheckedUpdateManyInput>;
    where?: Prisma.PreferenceWhereInput;
    limit?: number;
};
export type PreferenceUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PreferenceSelect<ExtArgs> | null;
    omit?: Prisma.PreferenceOmit<ExtArgs> | null;
    where: Prisma.PreferenceWhereUniqueInput;
    create: Prisma.XOR<Prisma.PreferenceCreateInput, Prisma.PreferenceUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PreferenceUpdateInput, Prisma.PreferenceUncheckedUpdateInput>;
};
export type PreferenceDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PreferenceSelect<ExtArgs> | null;
    omit?: Prisma.PreferenceOmit<ExtArgs> | null;
    where: Prisma.PreferenceWhereUniqueInput;
};
export type PreferenceDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PreferenceWhereInput;
    limit?: number;
};
export type PreferenceDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PreferenceSelect<ExtArgs> | null;
    omit?: Prisma.PreferenceOmit<ExtArgs> | null;
};
export {};
