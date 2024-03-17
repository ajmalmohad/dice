"use client";

import Navbar from "@/components/navbar/navbar";
import { CreateSharedLink } from "@/components/student/create-shared-link";
import SharedLinkCard from "@/components/student/shared-link";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

type SharedLink = {
  id: string;
  linkName: string;
  active: boolean;
};

export default function Page() {

  const [links, setLinks] = useState<SharedLink[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';

  useEffect(() => {
    setLoading(true);
    const fetchLinks = async () => {
      const res = await fetch("/api/sharedlink", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (res.status === 200) {
        setLinks(data);
        setLoading(false);
      } else {
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  const handleDelete = async (linkId: string) => { 
    const res = await fetch("/api/sharedlink/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ linkId }),
    });
    const data = await res.json();

    if (res.status === 200) {
      toast({ title: "Success", description: data.message });
      setLinks(links.filter((link) => link.id !== linkId));
    } else {
      toast({
        title: "Error",
        description: data.error,
        variant: "destructive",
      });
    }
  }

  return (
    <div>
      <Navbar className="mb-10" />
      <div className="mb-6">
        <CreateSharedLink />
      </div>
      <div className="max-2xl:grid max-2xl:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:flex 2xl:flex-wrap w-full gap-4">
        {links && links.length > 0 ? (
          links.map((link, index) => {
            return (
              <SharedLinkCard
                title={link.linkName}
                link={
                  origin +
                  "/shared/link/" +
                  link.id
                }
                linkId={link.id}
                active={link.active}
                key={index}
                handleDelete={() => handleDelete(link.id)}
              />
            );
          })
        ) : (
          <div className="text-ring">{ loading ? 'Loading' : 'No shared links found' }</div>
        )}
      </div>
    </div>
  );
}
