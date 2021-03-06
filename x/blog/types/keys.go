package types

const (
	// ModuleName defines the module name
	ModuleName = "blog"

	// StoreKey defines the primary module store key
	StoreKey = ModuleName

	// RouterKey is the message route for slashing
	RouterKey = ModuleName

	// QuerierRoute defines the module's query routing key
	QuerierRoute = ModuleName

	// MemStoreKey defines the in-memory store key
	MemStoreKey = "mem_blog"

	// PostKey defines the post value store key
	PostKey = "Post-value-"

	// PostCountKey defines the post count store key
	PostCountKey = "Post-count-"

	//CommentKey defines the comment value store key
	CommentKey = "Comment-value-"

	// CommentCountKey defines the commenet count store key
	CommentCountKey = "Comment-count-"
)

func KeyPrefix(p string) []byte {
	return []byte(p)
}
